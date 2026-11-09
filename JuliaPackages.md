# Julia Package Development Guidelines

Requires [Julia](https://julialang.org/install/) 1.12 or later and [Git](https://git-scm.com/).

## Setup

Once per machine: install [Revise.jl](https://github.com/timholy/Revise.jl) and [Runic.jl](https://github.com/fredrikekre/Runic.jl) into shared environments, so they never enter `Project.toml`.

```sh
julia --startup-file=no --project=@revise -e 'using Pkg; Pkg.add("Revise")'
julia --startup-file=no --project=@runic  -e 'using Pkg; Pkg.add("Runic")'
```

Once per package: clone and install the dependencies.

```sh
git clone https://github.com/{{owner}}/{{package_name}}.git
cd {{package_name}}
julia --startup-file=no --project=. -e 'using Pkg; Pkg.instantiate()'
julia --startup-file=no --project=docs -e 'using Pkg; Pkg.instantiate()'
```

## Develop

1. Branch from `main`, named after the issue.
2. Start Julia with [Revise.jl](https://github.com/timholy/Revise.jl). Edits under `src/` apply to the running session.
3. Edit the code, its docstrings, and the tests in `test/`.
4. Check: format, test, build the docs (about 5 minutes).
5. Commit and open a pull request. Review follows [ColPrac](https://github.com/SciML/ColPrac).

Steps 1 and 2:

```sh
git switch -c issue/123
julia --project=. -i -e 'insert!(LOAD_PATH, 2, "@revise"); using Revise; using {{module_name}}'
```

Steps 4 and 5:

```sh
julia --startup-file=no --project=@runic -m Runic --inplace .
julia --startup-file=no --project=. -e 'using Pkg; Pkg.test()'
julia --startup-file=no --project=docs docs/make.jl
git add src test docs
git commit -m "Add fast solver (#123)"
git push -u origin issue/123
```

Done when `Pkg.test()` passes and `docs/build/index.html` shows your change.

Separately, when a dependency is needed:

```sh
julia --startup-file=no --project=. -e 'using Pkg; Pkg.add("SomePackage")'
```

## Release (maintainers, about 15 minutes)

1. Open a pull request `Release vX.Y.Z` that sets `version` in `Project.toml` and `version` and `date-released` in `CITATION.cff`.
2. Merge it.
3. Comment `@JuliaRegistrator register` on the merge commit. For breaking or notable changes, add a `Release notes:` section below it.

Done when [TagBot](https://github.com/JuliaRegistries/TagBot) creates the tag `vX.Y.Z` and a GitHub release that lists the merged pull requests, about 15 minutes after the registry pull request merges (3 days for a first release).
Versions follow [SemVer](https://semver.org/). First release: install the [Registrator GitHub App](https://github.com/apps/juliateam-registrator) first.

## About this guide

Maintained at https://github.com/JuliaPackageFactory/Guidelines, rendered at https://juliapackagefactory.github.io/Guidelines/JuliaPackages?repo=ohno/Antique.jl.

<!-- raw -->
`repo` fills `{{owner}}` (`ohno`), `{{package_name}}` (`Antique.jl`), and `{{module_name}}` (`Antique`).
<!-- /raw -->

Badge for a package README:

```md
[![guidelines: JuliaPackageFactory](https://img.shields.io/badge/guidelines-JuliaPackageFactory-blueviolet)](https://juliapackagefactory.github.io/Guidelines/JuliaPackages?repo={{owner}}/{{package_name}})
```

Line for a package's `AGENTS.md`:

```
Follow https://juliapackagefactory.github.io/Guidelines/JuliaPackages.md with repo={{owner}}/{{package_name}}.
```
