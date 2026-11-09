// Renders one Markdown document from this directory into the page's <main>.
// The page names the document: /Guidelines/JuliaPackages (or JuliaPackages.html) renders
// JuliaPackages.md, and the directory itself (or index.html) renders README.md, so every
// Name.html is an identical copy of index.html.
// A document that contains {{owner}}, {{package_name}} or {{module_name}} is rendered for the
// repository given as ?repo=owner/Name.jl and gets a field to change it; any other document is
// rendered as it is. Text between <!-- raw --> and <!-- /raw --> is never substituted.
// A document with TOC_MIN_SECTIONS or more second-level headings gets a table of contents.
(function () {
  'use strict';

  var SITE = 'JuliaPackageFactory';
  var page = location.pathname.split('/').pop().replace(/\.html$/, '');
  var SOURCE = page === '' || page === 'index' ? 'README.md' : decodeURIComponent(page) + '.md';
  var DEFAULTS = { package_name: 'MyPackage.jl', owner: 'owner' };
  var SAFE = /^[A-Za-z0-9_.-]{1,64}$/;        // values are inserted into Markdown, so keep them plain
  var RAW_OPEN = '<!-- raw -->', RAW_CLOSE = '<!-- /raw -->';
  var PLACEHOLDER = /\{\{\s*([a-z_]+)\s*\}\}/g;
  var HAS_PLACEHOLDER = /\{\{\s*[a-z_]+\s*\}\}/;
  var TOC_MIN_SECTIONS = 6;

  // ---- page skeleton ----------------------------------------------------
  var icon = document.createElement('link');
  icon.rel = 'icon';
  icon.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='9' r='6' fill='%23389826'/%3E%3Ccircle cx='9' cy='22' r='6' fill='%23cb3c33'/%3E%3Ccircle cx='23' cy='22' r='6' fill='%239558b2'/%3E%3C/svg%3E";
  document.head.appendChild(icon);

  var main = document.querySelector('main');
  main.innerHTML =
    '<div id="title"></div>' +
    '<form id="params" class="params" autocomplete="off" novalidate hidden>' +
      '<label for="repo">Repository <input id="repo" name="repo" type="text" inputmode="url" placeholder="owner/MyPackage.jl" spellcheck="false" aria-describedby="repo-error"></label>' +
      '<p id="repo-parsed" class="parsed" aria-live="polite"></p>' +
      '<p id="repo-error" class="error" role="alert" hidden>Enter a GitHub repository, such as ohno/Antique.jl or its URL.</p>' +
    '</form>' +
    '<div id="content"><p class="status">Loading…</p></div>';

  var content = document.getElementById('content');
  var titleBox = document.getElementById('title');
  var form = document.getElementById('params');
  var repoInput = document.getElementById('repo');
  var repoError = document.getElementById('repo-error');
  var repoParsed = document.getElementById('repo-parsed');
  var sourceText = null;
  var templated = false;
  var current = null;
  var timer = null;

  // ---- parameters -------------------------------------------------------
  // One query parameter, ?repo=owner/Name.jl, as gh --repo takes it.
  function params(r) {
    return { package_name: r.package_name, owner: r.owner, module_name: r.package_name.replace(/\.jl$/, '') };
  }

  function readParams() {
    return params(parseRepo(new URLSearchParams(location.search).get('repo') || '') || DEFAULTS);
  }

  function isKnown(p) {
    return p.package_name !== DEFAULTS.package_name || p.owner !== DEFAULTS.owner;
  }

  function writeParams(p) {
    // owner and package_name passed SAFE, so the URL needs no escaping and stays readable.
    var qs = isKnown(p) ? '?repo=' + p.owner + '/' + p.package_name : '';
    history.replaceState(null, '', location.pathname + qs + location.hash);
  }

  // ---- template engine --------------------------------------------------
  // Apply fn to the text outside raw regions, and drop the raw markers.
  function outsideRaw(text, fn) {
    var out = '', i = 0;
    while (i < text.length) {
      var a = text.indexOf(RAW_OPEN, i);
      if (a < 0) { out += fn(text.slice(i)); break; }
      var b = text.indexOf(RAW_CLOSE, a);
      if (b < 0) b = text.length;
      out += fn(text.slice(i, a)) + text.slice(a + RAW_OPEN.length, b);
      i = b + RAW_CLOSE.length;
    }
    return out;
  }

  function substitute(text, p) {
    return outsideRaw(text, function (part) {
      return part.replace(PLACEHOLDER, function (m, name) {
        return Object.prototype.hasOwnProperty.call(p, name) ? p[name] : m;
      });
    });
  }

  function hasPlaceholders(text) {
    var found = false;
    outsideRaw(text, function (part) { if (HAS_PLACEHOLDER.test(part)) found = true; return part; });
    return found;
  }

  // ---- rendering --------------------------------------------------------
  function slug(text) {
    return text.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
  }

  var renderer = new marked.Renderer();
  renderer.heading = function (token) {
    var text = this.parser.parseInline(token.tokens);
    var id = slug(token.raw.replace(/^#+\s*/, ''));
    return '<h' + token.depth + ' id="' + id + '"><a class="anchor" href="#' + id + '">' + text + '</a></h' + token.depth + '>\n';
  };
  // A relative link to Name.md opens the file on GitHub; on this site it opens the rendered page Name.
  function pageLink(token) {
    var m = token.type === 'link' && /^([A-Za-z0-9_-]+)\.md([?#].*)?$/.exec(token.href);
    if (m) token.href = m[1] + (m[2] || '');
  }
  marked.use({ gfm: true, renderer: renderer, walkTokens: pageLink });

  function render(p, scrollToHash) {
    content.innerHTML = marked.parse(substitute(sourceText, p));
    // The title goes above the field; the field itself is never re-created, so typing is not interrupted.
    var h1 = content.querySelector('h1');
    titleBox.textContent = '';
    if (h1) titleBox.appendChild(h1);
    document.title = (templated && p.package_name !== DEFAULTS.package_name ? p.package_name + ' · ' : '') +
      (h1 ? h1.textContent + ' · ' : '') + SITE;
    form.hidden = !templated;
    addContents();
    addCopyButtons();
    if (scrollToHash && location.hash) {
      var target = document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView();
    }
  }

  // Table of contents from the second-level headings, grouped under the remaining first-level
  // headings (parts) when the document has them.
  function addContents() {
    var headings = content.querySelectorAll('h1, h2');
    if (content.querySelectorAll('h2').length < TOC_MIN_SECTIONS) return;
    var details = document.createElement('details');
    details.className = 'toc';
    var summary = document.createElement('summary');
    summary.textContent = 'Contents';
    details.appendChild(summary);
    var list = document.createElement('ol'), group = list;
    details.appendChild(list);
    headings.forEach(function (h) {
      var item = document.createElement('li');
      var link = document.createElement('a');
      link.href = '#' + h.id;
      link.textContent = h.textContent;
      item.appendChild(link);
      if (h.tagName === 'H1') {
        item.className = 'part';
        list.className = 'parts';
        group = document.createElement('ol');
        item.appendChild(group);
        list.appendChild(item);
      } else {
        group.appendChild(item);
      }
    });
    content.insertBefore(details, content.firstChild);
  }

  function addCopyButtons() {
    content.querySelectorAll('pre').forEach(function (pre) {
      var btn = document.createElement('button');
      btn.className = 'copy';
      btn.type = 'button';
      btn.textContent = 'Copy';
      btn.addEventListener('click', function () {
        copyText(pre.querySelector('code').textContent, btn);
      });
      pre.appendChild(btn);
    });
  }

  function copyText(text, btn) {
    var done = function () { var old = btn.textContent; btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = old; }, 1200); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () {});
  }

  // ---- wiring -----------------------------------------------------------
  function apply(p) {
    repoInput.value = isKnown(p) ? p.owner + '/' + p.package_name : '';
    current = p;
    showParsed(p);
    showError(false);
    render(p, true);
  }

  // Show the values the document is rendered with, so the reader can check the parse.
  function showParsed(p) {
    repoParsed.textContent = '';
    [['Owner', p.owner], ['Package', p.package_name]].forEach(function (pair) {
      var item = document.createElement('span');
      var code = document.createElement('code');
      code.textContent = pair[1];
      item.appendChild(document.createTextNode(pair[0] + ' '));
      item.appendChild(code);
      repoParsed.appendChild(item);
    });
  }

  // Accept owner/name, https://github.com/owner/name (with .git, a trailing slash, www. or a
  // deeper path), or git@github.com:owner/name.git. Return null for anything else.
  function parseRepo(text) {
    var s = text.trim().replace(/\/+$/, '');
    var m = s.match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/\s?#]+)\/([^\/\s?#]+)/i) ||
            s.match(/^git@github\.com:([^\/\s]+)\/([^\/\s]+)$/i) ||
            s.match(/^([^\/\s:.@][^\/\s:@]*)\/([^\/\s]+)$/);
    if (!m) return null;
    var owner = m[1], name = m[2].replace(/\.git$/i, '');
    return SAFE.test(owner) && SAFE.test(name) ? { owner: owner, package_name: name } : null;
  }

  function showError(on) {
    repoError.hidden = !on;
    if (on) repoInput.setAttribute('aria-invalid', 'true'); else repoInput.removeAttribute('aria-invalid');
  }

  // Re-render whenever the field holds a valid repository. While typing, an incomplete
  // value is ignored quietly; the error appears only on Enter or when the field loses focus.
  function update(reportErrors) {
    var text = repoInput.value;
    if (!text.trim()) { showError(false); return; }
    var r = parseRepo(text);
    if (!r) { if (reportErrors) showError(true); return; }
    showError(false);
    if (current && current.owner === r.owner && current.package_name === r.package_name) return;
    current = params(r);
    writeParams(current);
    showParsed(current);
    render(current, false);
  }

  repoInput.addEventListener('input', function () {
    clearTimeout(timer);
    timer = setTimeout(function () { update(false); }, 250);
  });
  repoInput.addEventListener('change', function () { clearTimeout(timer); update(true); });
  form.addEventListener('submit', function (e) { e.preventDefault(); clearTimeout(timer); update(true); });

  window.addEventListener('popstate', function () { if (templated) apply(readParams()); });

  fetch(SOURCE, { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error(r.status + ' ' + r.statusText); return r.text(); })
    .then(function (text) {
      sourceText = text;
      templated = hasPlaceholders(text);
      apply(templated ? readParams() : params(DEFAULTS));
    })
    .catch(function (err) {
      var status = document.createElement('p');
      status.className = 'status';
      var link = document.createElement('a');
      link.href = SOURCE;
      link.textContent = SOURCE;
      status.appendChild(document.createTextNode('Could not load '));
      status.appendChild(link);
      status.appendChild(document.createTextNode(' (' + err.message + ').'));
      content.textContent = '';
      content.appendChild(status);
    });
})();
