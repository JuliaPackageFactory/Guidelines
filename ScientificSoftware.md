# Scientific Software Development Guidelines

**Development practices for research software, distilled from 26 published sources and cited clause by clause.**

Part I covers software development in general, independent of language or field; Part II covers what scientific computing adds. Every clause is backed by at least one of the sources in [References](#references), and practices that are widely believed but not supported by these sources are listed in [Appendix B](#appendix-b-commonly-held-beliefs-without-support-in-the-sources) instead of being stated as clauses.

(MUST) marks a practice that at least one source states as *must*, *shall*, or *required* within the scope given in the heading, and (SHOULD) marks every other recommendation; the `> Sources:` line under each clause gives the source key, the section or rule where the recommendation appears, `(must)` where the source itself uses that word, and scope tags such as `[AC1+]` (DLR application class), `[NASA scope]` (models supporting critical decisions), `[JOSS]`, and `[if SemVer]`.

---

# Part I: Software development in general

## G1. Principles and proportionality

#### Choosing the level

### G1.1 (MUST) Match the rigor of quality practices to the software
Do not impose the same kinds and stringency of quality practices on all software. Choose them to fit the purpose, size, range of users, development period and the consequences of failure. Whatever level you choose, be aware that more rigorous practices exist.
> Sources: **DLR** §Application Classes (must) · **RSQ** three_tier_view § "History and context" · **TW** code-reuse § "Reusable Code"; code-reuse-overview § "Overview of Code Reuse" · **TW17** §Introduction · **W14** §Introduction · **N7009H** §5.1.1.4 — 6 sources.
> Note: The way levels are divided differs between sources (DLR's four classes, RSQ's three tiers, NASA's criticality matrix, TW17's "subject of a paper"), and they are not mapped onto one another. RSQ states that there is no agreed mapping of indicators to tiers [RSQ].

### G1.2 (SHOULD) Decide and record the target category at the start, and review it periodically
At the start of development, have the person responsible decide and record the software's target category (class, tier or criticality) and the practices to be applied accordingly. Review the category just before use and before entering a new phase.
> Sources: **DLR** §Definition of the intended Application Class, Figure 1 · **N7009** 4.1.1.2 [M&S 6] [NASA scope] (must) · **N7009H** §5.1.1.3 [M&S 6] · **RSQ** life_cycle § "Lifecycle Stages"; three_tier_view § "History and context" — 4 sources.

### G1.3 (MUST) Treat distribution to third parties and long-term development as triggers for moving to a higher level
If you distribute the software to third parties outside your institution, apply at least the lowest category (DLR application class 1) and consider a license. If the scope of functionality is large and development is expected to continue after the people who hold the knowledge leave (as a guide, more than two years), apply the next category up. Also raise the level above that for personal use when the software becomes the subject of a paper or is handed over to others (SHOULD).
> Sources: **DLR** §Definition of the intended Application Class, "Distribution of the software" [AC1+] (must) · **TW17** §Introduction · **RSQ** software_maintenance § "How do you maintain your research software over time?" Considerations — 3 sources.
> Note: Trigger thresholds differ between sources. DLR uses two years and one person-year; TW17 uses "once it has been used three or four times for slightly different purposes" as a guide.

### G1.4 (SHOULD) Aim for the most rigorous level when the impact of failure is high, regardless of size
If the results affect human safety, mission success, organizational liability or important outcomes, aim for the most rigorous category regardless of size or duration. NASA's standard N7009 imposes its requirements only on models that a criticality assessment places in this scope; for other models it can serve as best-practice guidance.
> Sources: **DLR** §Definition of the intended Application Class, "Risks for the facility" · **N7009H** §5.1.1.4 · **N7009** §4.1.1.2; §1.2.1 · **RSQ** life_cycle § "Research Software Lifecycle & Three-Tier Model" — 4 sources.
> Note: NASA's handbook cautions that compliance with procedures does not correlate with the level of credibility achieved [N7009H].

### G1.5 (SHOULD) Do not impose heavy practices on small, one-off or personal code
Do not require comprehensive documentation, unit tests, coverage measurement, CI and the like for code that answers a specific question about specific data only once, or for small personal scripts. For such code, running it on that data may be the only reasonable check; a simple example (G6.2) and a script that reruns the analysis are a good start. Once the code is reused, becomes important to a publication or is handed over, raise its level (G1.3).
> Sources: **TW17** §Conclusion; §Introduction · **W17** What we left out, Build tools · **DLR** §Application Class 0 · **RSQ** static_analysis § "How do you use static analysis to improve the quality of your research software?"; life_cycle § "Research Software Lifecycle & Three-Tier Model"; three_tier_view § "Analysis code" · **TW** compendia § "Summary"; code-reuse § "Reusable Code"; code-reuse-overview § "Overview of Code Reuse" · **CX** Turn repeatable work into skills — 6 sources.
> Note: "Do not impose heavy practices" does not mean "do nothing". RSQ says not to wait until software is widely used before establishing good habits [RSQ], and DLR recommends introducing the recommendations of higher classes early in a weaker form [DLR].

#### Introducing and assessing practices

### G1.6 (SHOULD) Introduce practices gradually rather than all at once
When introducing practices to a research group or an existing codebase, start with the core ones and add the rest gradually over a period of time. When introducing static analysis or similar tools to existing code, use the tool's baseline mechanism and address existing warnings gradually.
> Sources: **W14** §Conclusion · **W17** What we left out, Branches · **TW** overview-barriers § "Limited incentives to give evidence against yourself" · **RSQ** using_version_control § "How do you implement version control in your research workflow?" Solutions · **CX** Turn repeatable work into skills — 5 sources.

### G1.7 (SHOULD) You may drop recommendations that do not apply, after recording the reason
Interpret general standards and checklists for your own project, and adjust them if necessary. Record the reason for each item you do not meet or have dropped. If it is unclear how an alternative satisfies the risk-reduction intent, follow the standard.
> Sources: **DLR** §Definition of the intended Application Class, Figure 1 · **N7009** §4 · **N7009H** §4.2 · **TW** reviewing-checklist § "Checklist for code review process" — 4 sources.

### G1.8 (SHOULD) Self-assess achievement with a checklist, and treat the results as a diagnosis
Periodically check how far the recommendations for the target category have been implemented, and record unmet items and future tasks. Use assessment results and quality metrics as a diagnosis for finding improvements, not to score the software or its authors. Do not equate them with quality itself.
> Sources: **DLR** §Evaluation of the achieved Application Class; C3 "Usage Hints" · **NL** best_practices, §Checklists · **N7009H** §4.1 · **TW** reviewing-checklist § "Checklist for code review process" · **RSQ** fair_rs § "Tools and practices for FAIR" — 5 sources.

### G1.9 (SHOULD) Decide on improvement measures by cost-effectiveness, and avoid over-engineering
If the target level has not been reached, decide on improvement measures in light of the remaining development time and resources. Do not chase findings that do not affect correctness or explicitly stated requirements.
> Sources: **DLR** §Evaluation of the achieved Application Class; §Overview of the Recommendations (must) · **CC** Add an adversarial review step, Callout · **N7009H** §5.6.3.1.1 · **GEP** review/reviewer/standard intro — 4 sources.

## G2. Planning and scope

#### Purpose and requirements

### G2.1 (SHOULD) At the outset, briefly write down the purpose, intended use, constraints and what is out of scope, and agree on them with stakeholders
Early in development, briefly document the purpose, intended use, essential requirements, constraints (mandatory languages, environments and legal aspects) and what is out of scope, and agree on them with stakeholders. This document may be revised later. For models that support important decisions, recording the intended use is required (MUST).
> Sources: **DLR** EAM.1, §Requirements Management [AC1+] · **N7009** 4.1.1.1 [M&S 40] [NASA scope] (must) · **N7009H** §4.6; §5.1.1.2 [M&S 40] · **RSQ** life_cycle § "Requirements", § "Design" · **OSG** starting-a-project / Setting your goals · **CC** Let Claude interview you · **CX** Strong first use: Context and prompts — 7 sources.
> Note: W14 states that scientific programmers' requirements are rarely fixed, so methods that depend on upfront requirements specifications fit poorly [W14]. This clause does not require detailed specifications to be fixed in advance.

### G2.2 (SHOULD) Define completion and acceptance criteria for work in advance
For each task or change, define in advance what counts as done (tests pass, the bug no longer reproduces, etc.). For models and simulations, see also S3.11.
> Sources: **CX** Strong first use: Context and prompts · **CC** Let Claude interview you · **MS** code-reviews/pull-requests § "General Process" · **N7009** 4.1.1.5 [M&S 43] [NASA scope] (must) · **N7009H** §5.6.3.2 [M&S 31; Rec. 4.3.7a–c] · **RSQ** testing_software § "What types of software tests exist?" Considerations — 6 sources.

### G2.3 (SHOULD) State quality requirements and users early, and prioritize them
State quality requirements such as accuracy, uncertainty, performance and operational limits early, even if provisional, and prioritize them, because they conflict with one another. Also describe the user groups and their tasks.
> Sources: **DLR** §Requirements Management · **N7009H** §5.1.1.4 · **MS** engineering-fundamentals-checklist § "Design Reviews" · **RSQ** life_cycle § "Requirements", § "Design" · **NL** technology/user_experience, §Design Thinking — 5 sources.

#### Planning the work

### G2.4 (SHOULD) Assume that requirements and plans will change, and iterate in small units
Rather than planning months ahead in detail, work in small steps with frequent feedback and course correction. Produce requirements, plans and assessments early, even provisionally, and update them at later stages.
> Sources: **W14** Practice 3a, §Make Incremental Changes · **N7009H** §4.6 · **DLR** EAM.9, §Requirements Management [AC2+] · **TW** rdm-fair § "The FAIR Principles" — 4 sources.

### G2.5 (SHOULD) Manage requirements and work items in a list, prioritize them and review them regularly
Manage functional requirements, work items, known bugs and ideas for improvement in one shared, visible list (such as an issue tracker; a shared to-do list is enough for a small project). Give each item an identifier, description, priority and origin, write it so that newcomers can understand it, and review the list regularly with stakeholders. W14 recommends this once a team grows beyond a certain size.
> Sources: **DLR** EAM.2, §Requirements Management [AC2+]; EÄM.5, §Change Management [AC1+] · **TW** reviewing-checklist § "Documentation" · **MS** engineering-fundamentals-checklist § "Work Item Tracking" · **W14** Practice 8c, §Collaborate · **W17** 3b, §Collaboration · **RSQ** life_cycle § "Maintenance"; software_maintenance § "How do you maintain your research software over time?" Solutions, § "How do you track and manage technical debt in your research software?" Solutions · **N7009** 4.1.1.8 [M&S 51] [NASA scope] (must) — 7 sources.

### G2.6 (SHOULD) For medium-sized and larger software, maintain and publish a roadmap
For software developed over a long period by many people, maintain an outline plan showing what will be achieved in which version and by when, and put it where users and contributors can see it.
> Sources: **DLR** EÄM.4, §Change Management [AC2+] · **RSQ** life_cycle § "Planning" · **OSG** best-practices / Write down your project's vision — 3 sources.

### G2.7 (SHOULD) Plan from development through maintenance to retirement, and secure maintenance as an ongoing cost
Plan development, maintenance, publication and archiving (retirement), for example in a software management plan whose detail is proportionate to the nature and intended use of the software, and name the people or organizations responsible. Deliberately set aside time, staff and funding for maintenance and refactoring as a continuing cost. If maintenance can no longer continue, do not abandon the software silently; say so prominently in the README, archive the repository or publish a deprecation statement.
> Sources: **N7009** 4.1.1.3 [M&S 41] [NASA scope] (must) · **RSQ** life_cycle § "Lifecycle Stages"; three_tier_view § "History and context"; software_maintenance § "How do you maintain your research software over time?" · **NL** best_practices, §Software management plans · **OSG** starting-a-project / Setting your goals · **F4RS** Discussion, Netherlands eScience Center; Discussion, ELIXIR — 5 sources.

### G2.8 (SHOULD) For uncertain or large changes, separate investigation and planning from implementation
For changes where the approach is uncertain, that span multiple files, or that touch unfamiliar code, investigate before writing code and make a plan, including how to split the work. Skip the plan for small fixes whose diff can be described in one sentence.
> Sources: **CC** Explore first, then plan, then code · **CX** Plan first for difficult tasks; Common mistakes · **GEP** review/developer/small-cls § "Splitting CLs" — 3 sources.
> Note: CC itself says that skipping the plan is sometimes the right choice for exploratory tasks [CC].

## G3. Version control

#### What to put under version control

### G3.1 (MUST) Put code under version control from the start
Manage a project's code and scripts in a version control system (usually Git) from the moment you start writing them. This lets you identify which version of the code produced which result, and return to that state.
> Sources: **W14** Practice 3b, §Make Incremental Changes · **W17** 5h, Version control systems · **S13** Rule 4 · **TW17** Rule 1 · **TW** vcs § "Motivation" (must) · **NL** best_practices, §Version control (must) · **RSQ** quality § "Aspects of Research Software Quality"; using_version_control § "Why does version control matter for your research software?" · **DLR** EÄM.7, §Change Management [AC1+] · **N7009** 4.2.2g · **N7009H** §5.7 [Rec. 4.1.2b, 4.1.3a] — 10 sources.
> Note: S13 gives, as a minimal alternative, saving copies of scripts from time to time [S13].

### G3.2 (SHOULD) Put everything created by people under version control as soon as it is created
Put anything that people create or edit by hand, such as source code, scripts, configuration files, dependency specifications, build scripts, tool configuration, documentation sources and instruction files for AI agents, under version control when it is created.
> Sources: **W14** Practice 3c, §Make Incremental Changes · **TW17** Rule 1 · **W17** 5a, §Keeping track of changes · **RSQ** using_version_control § "Why does version control matter for your research software?" Solutions, § "How do you implement version control in your research workflow?" Solutions · **DLR** EÄM.7, §Change Management [AC1+] · **TW** vcs § "Motivation" (must) · **CC** Write an effective CLAUDE — 7 sources.

### G3.3 (SHOULD) Do not put secrets or data with restricted sharing in the repository
Do not put secrets such as passwords, private keys, API keys or tokens in the repository; keep them in local private files that are excluded from tracking (for example with .gitignore). Do not put legally restricted or otherwise sensitive data in public repositories either, and handle data "as open as possible, as closed as necessary." Before publishing, confirm that none of these are in the history.
> Sources: **MS** engineering-fundamentals-checklist § "Source Control", § "Security", § "Observability"; code-reviews/process-guidance/reviewer-guidance § "Functionality" · **W17** Inadvertent sharing · **RSQ** software_project_structure § "Use version control" · **OSG** starting-a-project / Your pre-launch checklist · **TW** rdm-fair § "Theory" — 5 sources.
> Note: No source states this as a must. No source describes what to do after a leak (revocation, reissue, removal from history).

### G3.4 (SHOULD) Do not version-control generated files that can be regenerated (small results may be an exception)
As a rule, do not commit anything that can be regenerated from the code and raw data, such as compiled binaries or intermediate analysis files. However, you may commit small data or results so that collaborators can refer to them easily and compare them across versions.
> Sources: **TW17** Rule 1 · **TW** vcs-checklist § "Make Use of Git" · **W14** Practice 3c, §Make Incremental Changes · **W17** What not to put under version control — 4 sources.
> Note: TW17 and TW say not to commit generated files, while W17 recommends committing them if they are small. Sources also split on raw data: W17 says tracking its versions is unnecessary [W17], while TW puts everything in the VCS [TW] (see S8).

### G3.5 (SHOULD) Do not commit large files or frequently changing binaries directly to the repository
Do not directly commit large data or result files, or frequently changing binaries (images, videos, compiled code); as a guide, W17 cites GitHub's per-file limit of 100 MB. Store them elsewhere, for example in an archive system, and leave metadata describing their contents and how to obtain them in the repository. If you need to track versions of data, first check whether a version control tool for data suits the project.
> Sources: **W17** What not to put under version control; 1a, §Data management · **MS** source-control/git-guidance/README § "Working with Images, Video and Other Binary Content" · **W14** Practice 3c, §Make Incremental Changes · **RSQ** software_project_structure § "Use version control" · **DLR** EÄM.7, §Change Management [AC1+] · **TW17** Rule 1 · **TW** vcs-checklist § "Make Sure That Your Data Is Version-Controlled"; vcs § "Summary", § "Version control systems"; vcs-git-in-research § "Issues", § "Tools" — 7 sources.
> Note: On Git LFS, W17 (2017) says it is not mature, MS mentions it as one example, and RSQ cautions that its current state should be checked before adopting it. On version control tools for data, W17 calls them immature, while TW recommends considering them.

#### Commits

### G3.6 (SHOULD) Limit each commit to one purpose
Make each commit a small, logical change with a single purpose. Separate bug fixes from new features, and refactoring or reformatting from functional changes. A guide for splitting is "the unit you would want to revert as a whole in the future".
> Sources: **TW** vcs-checklist § "Make Use of Git" · **DLR** EÄM.8, §Change Management [AC1+] · **MS** source-control/git-guidance/README § "Committing", § "Commit Best Practices"; CI-CD/continuous-integration § "Everyone Commits to the Git Repository Each Day" · **W17** 5b, §Keeping track of changes · **CCOM** FAQ "What do I do if the commit conforms to more than one…" · **GEP** review/developer/small-cls § "Separate Out Refactorings" · **CP** §Guidance on contributing PRs — 7 sources.
> Note: W17 explicitly says to avoid splitting too finely as well.

### G3.7 (SHOULD) Write what and why in commit messages and PR descriptions
Make the first line a short summary that makes sense on its own, and after a blank line write the context in the body: the reason, impact, related issues and so on; in a PR description, also state the drawbacks of the chosen approach. Do not write messages that do not convey their content, such as "update" or "Fix bug". In a team, agree on and document message conventions at the start; detailed rules such as a first line of about 50 characters in the imperative mood, or Conventional Commits, are optional, but if you adopt Conventional Commits, follow the specification's MUSTs (the `<type>: <description>` format, `feat` / `fix`, and `!` or `BREAKING CHANGE:` for breaking changes).
> Sources: **MS** engineering-fundamentals-checklist § "Source Control"; source-control/git-guidance/README § "Commit Best Practices", § "Commit Message Structure"; source-control/component-versioning § "Semantic Versioning"; code-reviews/pull-requests § "Pull Request Description"; code-reviews/process-guidance/author-guidance § "Properly Describe Your Pull Request (PR)" · **GEP** review/developer/cl-descriptions intro · **DLR** EÄM.8, §Change Management [AC1+] · **TW** vcs-checklist § "Make Use of Git", § "Contribute to Someone Else's Project"; vcs-workflow § "General Workflow"; vcs § "Motivation" · **RSQ** using_version_control § "Why does version control matter for your research software?" Solutions, § "How do you implement version control in your research workflow?" Solutions · **W17** 5d, §Keeping track of changes · **CC** Explore first, then plan, then code, Step "Commit" · **CCOM** Summary · **CP** §Guidance on contributing PRs — 9 sources.
> Note: No source makes Conventional Commits a general obligation.

### G3.8 (SHOULD) Commit small and often, and share and integrate changes frequently
Commit frequently in small units and regularly pull in others' changes so that individual versions do not diverge. Resolve merge conflicts only after understanding both versions, and confirm the resolution with a build and tests.
> Sources: **W17** 5c, §Keeping track of changes · **TW** vcs-checklist § "Make Use of Git" · **MS** source-control/git-guidance/README § "Committing", § "Commit Best Practices"; CI-CD/continuous-integration § "Everyone Commits to the Git Repository Each Day" · **RSQ** using_version_control § "Why does version control matter for your research software?" Solutions, § "How do you implement version control in your research workflow?" Solutions · **DLR** EAA.8, §Automation and Dependency Management [AC2+] — 5 sources.

### G3.9 (SHOULD) Do not put broken or unfinished code on shared branches
Keep the repository, and shared branches in particular, in a consistently working state (for the checks to run before committing, see G7.5).
> Sources: **W17** 5d, §Keeping track of changes · **MS** source-control/git-guidance/README § "Commit Best Practices"; CI-CD/continuous-integration § "Avoid Checking in Broken Builds", § "Everyone Commits to the Git Repository Each Day" (must) · **DLR** EÄM.8, §Change Management [AC1+] — 3 sources.
> Note: This is in tension with "commit frequently so you do not lose work" (G3.8). It can be read as separating work in progress on working branches from the main branch, but no source describes how to reconcile the two.

#### Branches and tools

### G3.11 (SHOULD) In repositories developed by several people, use working branches and pull requests
Follow the working-branch and pull-request workflow described in G10.1 instead of changing the main branch directly. Do not squash commits while a review is in progress.
> Sources: **MS** engineering-fundamentals-checklist § "Source Control"; source-control/README § "Creating a New Repository"; source-control/git-guidance/README § "Branching"; CI-CD/continuous-integration § "Branch Policy Enforcement"; code-reviews/pull-requests intro (must) · **CP** §Contributing PRs (must) · **NL** CONTRIBUTING, §Technical · **TW17** Rule 1 · **TW** vcs-checklist § "Make Use of Git" · **RSQ** using_version_control § "How do you implement version control in your research workflow?" Solutions — 6 sources.
> Note: TW17 likewise says to use feature branches "once you are comfortable" [TW17]. The only sources that state must are MS (enterprise customer projects) and CP (community packages). See Appendix B.

### G3.12 (SHOULD) In multi-person projects, decide the branching strategy and naming conventions at the start
Decide and document as a team, when development starts, the branching, merging and release strategy and the branch naming conventions. For small projects, a main branch plus short-lived working branches is often enough. Limit each branch to one purpose, and delete it after it has been merged.
> Sources: **MS** engineering-fundamentals-checklist § "Source Control"; source-control/README § "Creating a New Repository"; source-control/naming-branches intro · **RSQ** using_version_control § "How do you implement version control in your research workflow?" Solutions · **DLR** EÄM.9, §Change Management [AC2+] · **TW** vcs-checklist § "Make Use of Git" — 4 sources.

### G3.14 (SHOULD) Choose version control tools and hosting early, based on what those around you use
Choose what your colleagues or community already use. If you handle data, also consider whether platforms provided by your institution are available and what legal conditions apply.
> Sources: **W14** §Make Incremental Changes · **RSQ** using_version_control § "How do you choose the right version control system for your research project?" · **TW** vcs-git-in-research § "Tools", § "Git for research projects" — 3 sources.

## G4. Project layout, licensing and dependencies

#### Layout and project files

### G4.1 (MUST) Put a README at the root
Put a README at the root of the repository as the entry point to the project; its required content is set out in G8.1.
> Sources: **RSQ** documenting_software_project § "How to document your software project?" Solutions; creating_good_readme § "Why does your research software need a good README?" (must) · **OSG** starting-a-project / Launching your own open source project · **TW** open-checklist § "Open Source Software"; compendia § "Basic Compendium" · **W17** 3a, §Collaboration · **JOSS** RC §Good practices · **MS** engineering-fundamentals-checklist § "Source Control"; source-control/README § "Creating a New Repository" · **DLR** EÄM.2, §Change Management [AC1+] — 7 sources.

### G4.8 (SHOULD) Provide a CONTRIBUTING file if you accept contributions, and a CITATION file if you want to be cited
If you accept contributions from others, put a CONTRIBUTING file at the root, link to it from the README, and state there that contributions are welcome, how to report bugs and ask for support, the technical requirements for contributions, and how contributions are reviewed and accepted (roles, approval and merging rules, how much time maintainers can give); it can be simple at first. If you want the software to be cited, put a citation file (CITATION.cff is common) at the root and point to it from the README, giving the name, the version used, the authors, a stable reference such as a DOI and the repository URL; adding the authors' ORCID iDs is optional.
> Sources: **OSG** starting-a-project / Launching your own open source project; starting-a-project / Writing your contributing guidelines; best-practices / Communicate your expectations · **MS** engineering-fundamentals-checklist § "Source Control", § "Code Reviews"; source-control/README § "Creating a New Repository"; code-reviews/process-guidance/reviewer-guidance intro · **DLR** EÄM.2, §Change Management [AC1+] · **W17** 3a, §Collaboration; 3e, §Collaboration · **TW** open-checklist § "Open Source Software"; code-reuse-overview § "Repeatable Recommendations" · **JOSS** RC §Good practices · **RSQ** documenting_software_project § "How to document your software project?" Solutions; citing_software § "What is software citation?", § "Solution", § "Why do you need a CITATION.cff file?", § "What is the Citation File Format?" Solutions · **CFF** RM §Why should I add a CITATION.cff file to my repository?; SG §General structure of a CITATION.cff file (must) · **CP** intro · **NL** best_practices, §Releases — 10 sources.
> Note: OSG asks for CONTRIBUTING in "every project", but TW, W17 and RSQ limit it to cases where contributors are sought. No source requires the CFF format; W17 gives a plain-text CITATION file as an example.

### G4.9 (SHOULD) Use a consistent directory structure
Keep each project in its own directory, put metadata (README, LICENSE, CITATION, dependency specifications) at the root, and divide the rest into subdirectories by type of content, without mixing code, data and generated outputs. Follow the conventions of the language and build tools, and be consistent across all projects in the team. The specific directory names are optional.
> Sources: **W17** 4a, §Project organization · **RSQ** writing_readable_code § "Why is it important to make your source code readable?" Solutions; software_project_structure § "Why does structuring your software project matter?" · **TW** compendia § "Structure of a Research Compendium", § "Basic Compendium" · **DLR** EÄM.7, §Change Management [AC1+] · **MS** engineering-fundamentals-checklist § "Source Control" — 5 sources.
> Note: Sources split on whether to keep the paper in the same place as the software. RSQ recommends not mixing the package and the paper [RSQ], W17 and TW put them in the same project [W17][TW], and JOSS requires the same repository [JOSS].

### G4.10 (SHOULD) Give files names that describe their contents
Give files and directories names that describe their contents or role. Do not use names whose meaning changes, such as sequence numbers (result1.csv) or positions in the final manuscript (fig_3_a.png). Avoid special characters and spaces.
> Sources: **W17** 4f, §Project organization · **TW** compendia § "Creating a Compendium" · **RSQ** software_project_structure § "Directory structure"; citing_software § "Solution" — 3 sources.

### G4.11 (SHOULD) Do not hard-code values and paths that may change; separate them out as configuration
Do not write values that may change between runs or environments (parameters, file paths, logging settings) into the code; provide them as parameters with sensible defaults, through configuration files or command-line arguments. If users cannot run the software without editing it, the design is wrong. Keep configuration files under version control, excluding secrets.
> Sources: **TW17** Rule 3 · **MS** engineering-fundamentals-checklist § "Observability", § "Developer Experience (DevEx)"; documentation/README § "Challenges" · **TW** code-reuse-overview § "Re-runnable Recommendations" · **RSQ** software_project_structure § "Directory structure", § "Why does structuring your software project matter?" Considerations · **DLR** EAA.10, §Automation and Dependency Management [AC1+] — 5 sources.

#### Licenses and legal checks

### G4.2 (MUST) License code that you publish or distribute to others
When you publish or distribute code to others, decide on a license beforehand and attach it; because of copyright, others cannot use, modify or redistribute code that has no license, and placing code in a public repository does not license it. Choose early, considering the reuse you want, the licenses of your dependencies and your field, and the policies of your institution and funders, and use a standard OSI-approved license unmodified rather than custom terms (OSI approval is required for JOSS (MUST)). Put the license text as plain text in a LICENSE (or COPYING) file at the root, and also name the license in the README (these are (SHOULD)).
> Sources: **OSG** legal / Just give me the TL;DR…; legal / Which open source license is appropriate for my project?; starting-a-project / Choosing a license; starting-a-project / Launching your own open source project; legal / Why do people care so much about the legal side of open source? (must) · **NL** best_practices, §Licensing (must) · **JOSS** RC §Software license; RC §Good practices [JOSS] (must) · **DLR** ERM.2, §Release Management [AC1+]; ERM.9, §Release Management [AC1+] (must) · **W17** 3d, §Collaboration · **TW** code-reuse-overview § "Repeatable Recommendations"; open-checklist § "Open Source Software"; licensing § "What, How and Where of License Documentation"; licensing-checklist § "Checklist" · **RSQ** documenting_software_project § "How to document your software project?" Solutions; licensing_software § "How do I add a license to my code repository?" Solutions, § "What license should you apply to your research software?", § "Why should you assign a license to your research software?" Description, § "Public domain"; creating_good_readme § "License" (must) · **F4RS** FAIR4RS Principles, R1.1 · **MS** engineering-fundamentals-checklist § "Source Control"; source-control/README § "Creating a New Repository" · **TW17** Rule 2, README item 6 — 10 sources.
> Note: Making a permissive license the first choice is the majority view (W17, NL, OSG), but OSG recommends GPLv3 / AGPLv3 depending on the goals [OSG], and RSQ is neutral. There is no basis for rejecting the GPL.

### G4.6 (MUST) Check and comply with the license terms of dependencies and third-party code
Check and record the licenses of the software you depend on and of third-party code you incorporate, and confirm their compatibility with your own license. Include the required license information in distributions. Do not use others' code that has no license.
> Sources: **OSG** legal / Which open source license is appropriate for my project? (must) · **DLR** ERM.9, §Release Management [AC1+] (must) · **TW** reviewing-checklist § "Legal"; code-reuse-overview § "Repeatable Recommendations" · **RSQ** licensing_software § "What license should you apply to your research software?" — 4 sources.

### G4.19 (MUST) Before distributing outside your institution, check whether export control regulations apply
Before distributing software to third parties outside your institution, check whether it contains regulated elements such as cryptography, and whether the recipients fall under the regulations (for example, sanctions lists or countries that require a license). The checking procedure and point of contact are organization-specific.
> Sources: **DLR** ERM.10, §Release Management [AC1+] (must) · **N7009H** §4.5.3 — 2 sources.
> Note: Which laws apply is outside the scope of the sources.

#### Dependencies

### G4.12 (MUST) Declare dependencies in machine-readable form
Declare the libraries and tools you depend on per project, in machine-readable form, using the language's standard mechanism, and commit the declaration to the repository. Write requirements that the language's mechanism cannot express (OS, interpreter version, additional software, computing resources) in the README.
> Sources: **TW17** Rule 6 · **W17** 2g, §Software · **JOSS** RC §Documentation, Installation instructions · **RSQ** creating_good_readme § "Requirements" (must) · **DLR** EAA.2, §Automation and Dependency Management [AC1+] · **TW** renv-options § "Package Management Systems" · **MS** engineering-fundamentals-checklist § "Developer Experience (DevEx)"; CI-CD/continuous-integration § "Automated Local Environment Setup" · **F4RS** FAIR4RS Principles, R2 — 8 sources.

### G4.13 (SHOULD) Make dependencies installable automatically, and install them that way yourself as a developer
Make dependencies installable automatically with a package manager (and a virtual environment, depending on the language). As a developer, install from the dependency specification yourself, and confirm that it works.
> Sources: **JOSS** RC §Documentation, Installation instructions · **MS** engineering-fundamentals-checklist § "Developer Experience (DevEx)"; CI-CD/continuous-integration § "Automated Local Environment Setup" · **TW17** Rule 6 · **RSQ** reproducible_software_environments § "How do you create virtual software development environments?" · **TW** renv-options § "Package Management Systems" — 5 sources.

### G4.14 (SHOULD) Reuse established libraries, and choose dependencies carefully
Do not write your own solutions to established problems such as numerical integration or matrix inversion; find and use well-maintained existing libraries. Because dependencies are also liabilities that can bring in changes, deprecations and security problems, use only those with measurable benefits, choose ones that are robust and available from stable sources, evaluate them before relying on them (S3.5), and keep the dependency tree small and well understood.
> Sources: **W14** Practice 4c, §Don't Repeat Yourself (or Others) · **W17** 2d, §Software · **TW17** Rule 5 · **RSQ** software_maintenance § "How do you maintain your research software over time?" Considerations · **JOSS** SUB §Scope and significance, Design thinking · **N7009H** §5.3.2 g; §5.4.2; §5.5 Note · **TW** reviewing-checklist § "Function/Method definitions" · **MS** security/README § "OWASP Cheat Sheets", § "Recommended Tools" — 8 sources.
> Note: No source states, at should or stronger, that dependencies should be scanned regularly for known vulnerabilities (MS gives this only as an example).

### G4.15 (SHOULD) Record the exact versions of the software and dependencies used for results
Record the exact versions of the software and dependencies used when the results were obtained, so that the same environment can be reconstructed later, and make dependency updates traceable as changes in the recorded versions. For every program (however small) and library used to produce a result, recording its name and a unique version number, together with the parameter values and inputs (data files and their versions) linked to each output, is required (MUST).
> Sources: **RSQ** software_maintenance § "How do you maintain your research software over time?" Solutions · **S13** Rule 3; Rule 1 · **DLR** EAA.2, §Automation and Dependency Management [AC1+]; EAA.6, §Automation and Dependency Management [AC3+] · **TW** renv-options § "Package Management Systems"; code-reuse-overview § "Portable Recommendations"; renv § "Summary", § "What is a Computational Environment?", § "Motivation and Background" (must) · **W14** §Let the Computer Do the Work, 2 · **N7009** 4.3.2b · **N7009H** §5.6.2.1 [M&S 24, 25; Rec. 4.3.2c, 4.3.2d] · **TW17** Rule 10 — 8 sources.
> Note: There is a tension within RSQKit. The maintenance section recommends pinning exact versions [RSQ], while the environments section says there is little need to worry about specific versions during development [RSQ]. See Appendix B.

### G4.17 (SHOULD) Preserve the dependency software needed to reproduce results and releases
Preserve the exact versions of the dependency software needed to reproduce important results and releases, so that they can be reconstructed even if they disappear from public repositories.
> Sources: **DLR** EAA.4, §Automation and Dependency Management [AC3+] · **S13** Rule 3 · **W17** 5a, §Keeping track of changes — 3 sources.

## G5. Design and coding

Write programs so that people, including your future self and new members, can read and understand them [W14][RSQ][TW][CP].

#### Structure and simplicity

### G5.2 (SHOULD) Divide programs into short, single-purpose functions
Divide programs into functions that each do a single, easily understood job, and keep the number of things a reader must hold in mind at once small. Consider splitting functions that are too long or take many arguments.
> Sources: **W14** Practice 1a, §Write Programs for People, Not Computers · **W17** §Software · **RSQ** writing_readable_code § "Why is it important to make your source code readable?" Solutions · **MS** code-reviews/process-guidance/reviewer-guidance § "Complexity" · **TW** reviewing-checklist § "Classes and types" · **DLR** EDI.2, §Design and Implementation [AC1+] — 6 sources.
> Note: The guides for line counts and numbers of arguments vary between sources (W17: about 60 lines and no more than five or six arguments; MS: more than three arguments may indicate excessive complexity). There is no agreed threshold.

### G5.3 (SHOULD) Eliminate duplication
Do not copy code; put it into functions and reuse it. Group many closely related variables into data structures.
> Sources: **W14** Practice 4b, §Don't Repeat Yourself (or Others) · **W17** 2c, §Software · **DLR** EDI.9, §Design and Implementation [AC1+] · **TW** reviewing-checklist § "Function/Method definitions" — 4 sources.

### G5.4 (MUST) Give data and constants a single authoritative representation
Give every piece of data a single authoritative representation in the system. Define physical constants and the like only once, so that the whole program uses the same value.
> Sources: **W14** Practice 4a, §Don't Repeat Yourself (or Others) (must) · **DLR** EDI.9, §Design and Implementation [AC1+] — 2 sources.
> Note: No source requires recording the source or version of constant values.

### G5.5 (SHOULD) Prefer simple, understandable solutions
At the level of lines, functions and classes, check whether readers can understand the code quickly and whether changes to it are likely to introduce bugs.
> Sources: **DLR** EDI.10, §Design and Implementation [AC1+] · **GEP** review/reviewer/looking-for § "Complexity" · **MS** code-reviews/process-guidance/reviewer-guidance § "Complexity" · **TW** reviewing-checklist § "Architecture" · **W14** Practice 1a, §Write Programs for People, Not Computers · **N7009H** §5.2.1.2 — 6 sources.

### G5.6 (SHOULD) Do not generalize or add features merely on speculation about the future
Solve the problems you know need solving now, and do not generalize merely on the speculation that it might be needed in the future. Solve future problems once they actually appear and their shape is known.
> Sources: **GEP** review/reviewer/looking-for § "Complexity" · **MS** code-reviews/process-guidance/reviewer-guidance § "Complexity" · **DLR** EDI.10, §Design and Implementation [AC1+] · **CC** Add an adversarial review step, Callout — 4 sources.
> Note: Some sources ask you to consider extensibility in advance [N7009H][TW][JOSS]. The two are compatible if such extensibility is treated as a deliberate choice based on requirements.

#### Names, style and comments

### G5.15 (SHOULD) Use meaningful, consistent names
Give functions, variables, classes and modules consistent names that convey what they are and what they do, and follow the language's naming conventions. Avoid single-letter or generic names (tmp, results2) except for loop counters in short scopes.
> Sources: **W14** Practice 1b · **W17** 2f, §Software · **GEP** review/reviewer/looking-for § "Naming" · **MS** code-reviews/process-guidance/reviewer-guidance § "Naming/Readability" · **DLR** EDI.1, §Design and Implementation [AC1+] · **RSQ** writing_readable_code § "Why is it important to make your source code readable?" · **OSG** starting-a-project / Your pre-launch checklist — 7 sources.

### G5.16 (MUST) In code that is shared or distributed, consistently follow agreed style rules
Consistently apply rules agreed in the team (at least for formatting and comments), based on the language community's style guide, and match the existing style when making changes.
> Sources: **W14** Practice 1c · **DLR** EDI.1, §Design and Implementation [AC1+] · **GEP** review/reviewer/standard § "Principles"; review/reviewer/looking-for § "Style", § "Consistency" (must) · **CP** §Contributing PRs · **RSQ** writing_readable_code § "Why is it important to make your source code readable?" · **OSG** starting-a-project / Your pre-launch checklist · **MS** CI-CD/continuous-integration § "Code Style Checks"; code-reviews/pull-requests § "General Process"; code-reviews/process-guidance/reviewer-guidance § "Style" (must) — 7 sources.
> Note: Sources differ on what to do when the style guide and existing code disagree. GEP treats the guide as absolute [GEP], while RSQ and CP prioritize consistency with existing code [RSQ][CP]. A style guide is not required for a project in its launch phase [OSG].

### G5.17 (SHOULD) Automate style checks and static analysis with tools
Check compliance with simple style rules automatically with formatters, linters and static analysis tools, and build them into CI pass/fail checks or pre-commit hooks. Agree on and document what is enforced and how warning suppressions are handled. Leave formatting and fine points of style to these tools instead of debating them in review, so that human review can focus on design and functionality.
> Sources: **DLR** EDI.7, §Design and Implementation [AC2+] · **MS** CI-CD/continuous-integration § "Code Style Checks", § "Build on Commit"; code-reviews/pull-requests intro, § "General Process"; code-reviews/process-guidance/README § "Automate Whenever Reasonable"; engineering-fundamentals-checklist § "CI/CD", § "Code Reviews"; code-reviews/process-guidance/reviewer-guidance intro, § "Style" (must) · **RSQ** ci_cd § "Considerations", § "Solutions"; static_analysis § "How do you use static analysis to improve the quality of your research software?" Solutions; code_review § "Solution - code review tips & tools", § "Consideration - what not to look for in a review?"; writing_readable_code § "Why is it important to make your source code readable?" Solutions · **OSG** best-practices / Use tools to automate basic maintenance tasks · **NL** best_practices, §Code Quality / EditorConfig · **CP** §Guidance on automatically enforcing guidelines · **TW** reviewing-checklist § "For the reviewer" · **GEP** review/reviewer/standard § "Principles"; review/reviewer/looking-for § "Style" — 8 sources.
> Note: This does not apply to throwaway scripts or exploratory notebooks [RSQ]. Static analysis is not a substitute for testing or review [RSQ]. Overly complex rules become a barrier to contribution [OSG].

### G5.18 (SHOULD) Write "why" in comments, and if an explanation is needed, first rewrite the code
Use comments mainly to explain why the code exists, and do not write comments that merely restate what it does. If a long explanation becomes necessary, rewrite the code more simply before writing the explanation. Regular expressions and complex algorithms are exceptions.
> Sources: **GEP** review/reviewer/looking-for § "Comments" · **MS** code-reviews/process-guidance/reviewer-guidance § "Style" · **RSQ** documenting_code § "Document as you code" · **W14** Practice 7a · **DLR** EDI.1, §Design and Implementation [AC1+] — 5 sources.

### G5.20 (SHOULD) Do not leave unused or commented-out code
Do not leave unused code fragments or debugging code (version control keeps old versions), and do not commit tests that are commented out. Switch behavior with conditionals, not by commenting code out.
> Sources: **TW** vcs § "Motivation" · **CP** §Guidance on contributing PRs · **MS** CI-CD/continuous-integration § "Avoid Commenting Out Failing Tests" · **W17** 2h, §Software — 4 sources.

#### Interfaces, inputs and errors

### G5.19 (SHOULD) Describe the purpose, inputs, outputs and assumptions at the top of functions and programs
At the top of each function, method and program, describe in a form embedded in the software itself, such as a docstring, what it does, its inputs and outputs (including units), and its preconditions and postconditions. Comment on edge cases and pitfalls where they occur, writing these while you code and keeping them up to date. However short the program, put a description and a usage example at the top.
> Sources: **W14** Practice 7, §Document Design and Purpose, Not Mechanics · **W17** 2a, §Software · **TW** reviewing-checklist § "Function/Method declarations" · **CP** §Contributing PRs · **RSQ** documenting_code § "Document as you code" · **OSG** starting-a-project / Your pre-launch checklist · **DLR** EDI.1, §Design and Implementation [AC1+] · **GEP** review/reviewer/looking-for § "Comments" — 8 sources.
> Note: No source makes docstrings mandatory for every public function (all are should or weaker).

### G5.23 (MUST) If you use SemVer, declare the public API and distinguish it from internal names
Declare the public API precisely and comprehensively, in the code or in the documentation. Make internal names not intended for external use distinguishable, and consider carefully before exporting generic names that could clash with existing names (both of these are (SHOULD)).
> Sources: **SEMVER** Specification §1 [if SemVer] (must) · **CP** §Definition of Public API — 2 sources.
> Note: Only TW says to keep the public API "minimal"; SemVer and CP merely require it to be declared.

### G5.7 (SHOULD) Check inputs and assumptions, and stop rather than silently continue when they are invalid
At startup and at function entry, check that inputs are within valid ranges, and raise an error on impossible inputs instead of silently processing them. Check behavior with assertions and precondition and postcondition checks, and stop immediately if there is an error. Decide how much checking to do according to the consequences of incorrect results.
> Sources: **TW17** Rule 3 · **W14** Practice 5a, §Plan for Mistakes · **N7009H** §5.4.2 [Rec. 4.2.2c] · **TW** testing-unittest § "Unit Testing Tips" — 4 sources.

### G5.8 (SHOULD) Handle errors explicitly, and on failure give messages that show the cause and the remedy
Check the return values and errors of library calls, and log errors or report them to the user. On failure, show where it failed, what the problem is, and how to fix it or where to look in the documentation.
> Sources: **MS** code-reviews/process-guidance/reviewer-guidance § "Error Handling" · **TW** reviewing-checklist § "Security of new codes" · **N7009H** §5.4.2 [Rec. 4.2.2c] · **N7009** 4.2.2c · **RSQ** documenting_code § "Write meaningful error messages" — 4 sources.

#### Design, change and resources

### G5.10 (SHOULD) Consider testability in the design
From the design stage, consider whether components can be set to a defined state and their effects observed, and divide the software into independently working parts with clear and few dependencies.
> Sources: **DLR** ESA.3, §Software Architecture [AC2+] · **TW** reviewing-checklist § "Classes and types" · **MS** automated-testing/README § "Build for Testing" · **W14** §Plan for Mistakes — 4 sources.

### G5.11 (SHOULD) Follow the existing architecture, patterns and terminology
Model changes on the architecture and coding patterns of the existing codebase, and use the terminology defined in the requirements and architecture consistently in the implementation.
> Sources: **CC** Provide specific context in your prompts, "Reference existing patterns." · **MS** code-reviews/process-guidance/reviewer-guidance § "Design", § "Functionality" · **DLR** EDI.4, §Design and Implementation [AC2+] — 3 sources.

### G5.13 (SHOULD) Record major design decisions together with alternatives and reasons
Document, at least briefly, the design concepts and decisions that cannot be read from the code (how components interact, the parallelization approach, why a library was chosen, rejected options and the reasons for rejecting them), date them, and keep them in the repository.
> Sources: **MS** engineering-fundamentals-checklist § "Design Reviews" · **JOSS** RC §Software paper content, Software design [JOSS] (must) · **DLR** ESA.7, §Software Architecture [AC2+] · **N7009H** §5.3.1 c(4) · **W14** Practice 7, §Document Design and Purpose, Not Mechanics · **DX** explanation.rst / Provide context · **RSQ** software_maintenance § "How do you maintain your research software over time?"; code_review § "Why it matters in research?" — 7 sources.

### G5.14 (SHOULD) Refactor in small, continuous steps
Do small refactorings on the spot under the safety net of tests (for cleaning up the complexity a change introduces, see G10.7). Do not rewrite everything at once for large improvements; split them into small steps that can be reviewed and verified individually.
> Sources: **DLR** §Design and Implementation · **RSQ** software_maintenance § "How do you track and manage technical debt in your research software?" Solutions · **GEP** review/reviewer/pushback § "Cleaning It Up Later" (must) — 3 sources.

### G5.28 (SHOULD) Do not waste resources; choose algorithms and data structures suited to the scale
Avoid unnecessary CPU and memory use and redundant disk writes, and choose data structures and algorithms that scale appropriately with the size of the problem.
> Sources: **RSQ** quality § "Aspects of Research Software Quality" · **MS** code-reviews/process-guidance/reviewer-guidance § "Functionality" · **NL** technology/datasets, §Data processing libraries on a single machine — 3 sources.

## G6. Testing

Tests do not prove correctness; they give confidence that code works as expected and ensure that it keeps working after later changes [DLR][RSQ][TW][NL].

#### What to test

### G6.1 (SHOULD) Write tests for code that is used repeatedly or shared
Even if you cannot cover existing code all at once, start by writing some tests, and add tests to any new code you write. Do not use lack of time as a reason to skip tests. For one-off exploratory code, follow G1.5.
> Sources: **NL** best_practices, §Testing · **TW** testing § "Summary" · **MS** automated-testing/README § "Why Testing" · **OSG** best-practices / Require tests and other checks… · **W14** §Plan for Mistakes · **DLR** §Software Test (must) · **RSQ** testing_software § "What types of software tests exist?" Considerations, § "How do we test our code?" Solutions · **JOSS** RC §Tests · **TW17** Rule 9 — 9 sources.
> Note: The must in DLR concerns deciding on a test strategy; no source makes writing tests itself a must.

### G6.2 (SHOULD) Provide simple examples with known inputs and outputs
Provide a simple example or test dataset that confirms that a known correct output is obtained for a known simple input, so that anyone who installs the software can run it and confirm that the software works.
> Sources: **W17** 2i, §Software · **TW17** Rule 9 · **TW** testing-overview § "Overview of Testing Types", § "Types of Testing"; testing-checklist § "Writing tests" · **JOSS** RC §Functionality · **N7009** 4.2.2e · **N7009H** §5.6.2.1 — 6 sources.
> Note: The sources agree and none opposes this, but none states it as a must.

### G6.6 (SHOULD) Turn discovered bugs into test cases
When you find a bug, first write a failing test that reproduces it, and then fix the bug. Keep that test to detect any recurrence.
> Sources: **W14** Practice 5c, §Plan for Mistakes · **DLR** EST.5, §Software Test [AC3+] · **TW** testing-unittest § "Unit Testing Tips" · **CC** Provide specific context in your prompts, "Describe the symptom." · **CP** §Accidental breaking releases, Example — 4 sources.

### G6.18 (SHOULD) Test boundary conditions, edge cases, and error conditions, not only the normal path
Test boundary conditions and edge cases, and test that invalid input produces errors. Prioritize critical execution paths, complex logic, and parts that could affect the correctness of reported results.
> Sources: **RSQ** testing_software § "What types of software tests exist?" Considerations, § "How do we test our code?" Solutions; software_maintenance § "How do you maintain your research software over time?" Solutions · **MS** code-reviews/process-guidance/reviewer-guidance § "Tests" · **GEP** review/reviewer/looking-for § "Functionality" · **TW** reviewing-checklist § "Tests" — 4 sources.

### G6.24 (SHOULD) Before refactoring, prepare tests that pin down the current behavior
When refactoring code that has no tests, first prepare tests that check its current behavior, and confirm that the behavior is unchanged before and after the refactoring.
> Sources: **RSQ** software_maintenance § "How do you track and manage technical debt in your research software?" Considerations · **GEP** review/developer/small-cls § "Keep related test code in the same CL" · **DLR** EDI.5, §Design and Implementation [AC2+] · **BSSw** §Types of Tests, No-Change/Characterization Tests — 4 sources.

#### How to write tests

### G6.7 (SHOULD) Make tests automatic and self-checking
Do not throw away checks done with print statements or by eye; turn them into test functions with built-in comparisons against expected values, and collect them into a test suite that runs automatically. Do not insert manual steps into judging the results.
> Sources: **TW** testing § "Motivation and Background", § "The advantages of testing for research" · **RSQ** testing_software § "What types of software tests exist?" Considerations, § "How do we test our code?" Solutions, § "How do we automate code testing?" Considerations · **W14** §Plan for Mistakes · **DLR** EST.1, §Software Test [AC2+] — 4 sources.

### G6.8 (SHOULD) Use an existing test framework
Use a widely used unit-testing library suited to the language, so that preparing inputs, running tests, and reporting results are handled uniformly.
> Sources: **W14** Practice 5b, §Plan for Mistakes · **TW** testing-guidance § "Use a Testing Framework"; testing-checklist § "Good practice checks"; reviewing-checklist § "Tests" · **RSQ** testing_software § "How do we test our code?", § "How do we automate code testing?" Solutions · **BSSw** §Granularity of Tests, Unit Tests · **DLR** EST.2, §Software Test [AC2+] — 5 sources.

### G6.12 (SHOULD) Make tests deterministic, and find and fix the cause of flaky tests
Make tests produce the same result for the same input regardless of environment. Treat a test that fails or passes without any change as a sign of a defect, and identify and fix the cause (dependence on external services, interactions between threads, and so on).
> Sources: **DLR** EST.6, §Software Test [AC3+] · **RSQ** testing_software § "What types of software tests exist?" Considerations, § "How do we test our code?" Solutions, § "How do we automate code testing?" Considerations · **TW17** Rule 10 — 3 sources.

### G6.13 (SHOULD) Keep tests independent of one another, and replace external dependencies with test doubles in unit tests
Do not make any test depend on the state of other tests. Where possible, replace dependencies on networks or external services with stubs or mocks.
> Sources: **RSQ** testing_software § "How do we test our code?" Solutions, § "How do we automate code testing?" Considerations (must) · **TW** testing-guidance § "Use test doubles/stubs/mocking where appropriate"; testing-unittest § "Unit Testing", § "Unit Testing Tips" · **MS** automated-testing/README § "The Fundamentals"; CI-CD/continuous-integration § "Unit Testing" · **DLR** EST.6, §Software Test [AC3+] — 4 sources.

### G6.19 (SHOULD) Keep each test focused, and name it so that its purpose is clear
Focus each test on a single condition, give it a name that conveys its purpose, and structure it so that the cause of a failure is easy to trace.
> Sources: **RSQ** testing_software § "What types of software tests exist?" Considerations, § "How do we test our code?" Solutions, § "How do we automate code testing?" Considerations · **TW** testing-guidance § "Aim to have a good code coverage" · **GEP** review/reviewer/looking-for § "Tests" — 3 sources.

#### Test strategy and coverage

### G6.9 (SHOULD) Build on unit tests and supplement them with integration and system tests
Center your testing on fast unit tests that target individual functions and classes, and supplement them with integration tests that check interactions between components and system tests that exercise the whole system at the level of user operations. Do not rely on system-level tests alone for regression testing.
> Sources: **DLR** EDI.3, §Design and Implementation [AC2+] · **BSSw** §Granularity of Tests, Unit Tests (must) · **TW** testing-overview § "Overview of Testing Types", § "Types of Testing"; testing-checklist § "Writing tests" · **RSQ** testing_software § "What types of software tests exist?", § "How do we test our code?" Solutions · **MS** engineering-fundamentals-checklist § "Testing"; automated-testing/README § "The Fundamentals" · **W14** §Plan for Mistakes · **GEP** review/reviewer/looking-for § "Tests"; review/developer/small-cls § "Keep related test code in the same CL" — 7 sources.
> Note: No source specifies a ratio.

### G6.10 (SHOULD) Distinguish the "type" and the "granularity" of tests, and write dedicated performance tests when performance matters
Treat what each test checks (verification, acceptance/validation, no-change (characterization), performance) as an axis separate from its granularity (G6.9), and combine the two according to purpose (for verification tests in scientific computing, see S3). When run time or resource usage is a requirement, write dedicated tests that measure the performance of specific code or subsystems rather than adding timers to existing tests; code can become ten times slower even when all other tests pass.
> Sources: **BSSw** §Definitions and Categories of Tests; §Types of Tests, Performance Tests (must) · **RSQ** testing_software § "What types of software tests exist?", § "How do we test our code?" Solutions · **MS** automated-testing/README § "Map of Outcomes to Testing Techniques", § "The Fundamentals" · **TW** testing-overview § "Overview of Testing Types", § "Types of Testing"; testing-checklist § "Writing tests"; testing-unittest § "Unit Testing Tips" · **DLR** EST.3, §Software Test [AC3+] — 5 sources.

### G6.20 (SHOULD) Measure coverage to find gaps (do not make numeric targets an obligation)
Measure coverage and use it as a clue for finding important parts that are untested. Do not aim solely for 100%, and keep in mind that high coverage does not guarantee correctness.
> Sources: **RSQ** testing_software § "What types of software tests exist?" Considerations, § "How do we test our code?" Solutions; software_maintenance § "How do you maintain your research software over time?" Solutions · **TW** testing-guidance § "Aim to have a good code coverage"; testing-checklist § "Good practice checks" · **MS** CI-CD/continuous-integration § "Code Coverage Checks" · **DLR** EST.8, §Software Test [AC2+] · **N7009H** §5.5.2.2 a · **BSSw** §Test Analysis Tools, Code Coverage — 5 sources.
> Note: The MS checklist gives ">90% if possible," and the MS CI page only gives the example that "many tools fail the build below 80%"; the other sources give no figures. See Appendix B.

### G6.26 (SHOULD) Use manual testing as a supplement, and document the procedure
You may check manually anything that requires human judgment, such as GUIs, visual output, and usability. In that case, document the procedure and the expected results, and turn the parts that can be repeated into automated tests.
> Sources: **RSQ** testing_software § "How do we test our code?", § "How do we automate code testing?" Solutions · **DLR** EST.3, §Software Test [AC3+] · **JOSS** RC §Tests — 3 sources.

### G6.27 (SHOULD) For code under long-term development, decide on a test strategy and review it periodically
Based on the quality requirements, decide and document which test levels to perform, at what intensity, when, and in which environments, and review this periodically.
> Sources: **DLR** EST.1, §Software Test [AC2+] · **MS** automated-testing/README § "Map of Outcomes to Testing Techniques" · **RSQ** testing_software § "What types of software tests exist?", § "How do we test our code?" Solutions — 3 sources.

#### Running tests

### G6.4 (SHOULD) Run tests from early in development, and rerun them automatically after every change
Write and run tests alongside the code from the start of development, and do not leave long gaps between runs. Every time you change the code, automatically rerun the existing tests (in CI where it exists, G7.3) to confirm that a change in one place has not broken other parts.
> Sources: **W14** §Plan for Mistakes · **TW** testing-acceptance-regression § "Regression testing"; testing-overview § "Types of Testing"; testing-guidance § "Run the tests"; testing-checklist § "Good practice checks" · **N7009H** §5.5.2.2 a; §5.4.1 · **RSQ** quality § "Aspects of Research Software Quality"; life_cycle § "QA & Documentation"; testing_software § "How do we automate code testing?", § "What types of software tests exist?" Considerations, § "How do we test our code?" Solutions; ci_cd § "Continuous Integration (CI)", § "Considerations"; using_version_control § "How do you implement version control in your research workflow?" Solutions; code_review § "Solution - code review tips & tools" · **DLR** EST.2, §Software Test [AC2+] · **MS** automated-testing/README § "The Fundamentals"; CI-CD/continuous-integration § "Unit Testing" — 6 sources.
> Note: The sources agree and none opposes this, but none states it as a must.

### G6.14 (SHOULD) Keep unit tests fast
Keep unit tests fast to build and fast to run. For long-running checks, set a maximum timeout so that they fail early.
> Sources: **BSSw** §Granularity of Tests, Unit Tests (must) · **RSQ** testing_software § "What types of software tests exist?" Considerations, § "How do we test our code?" Solutions, § "How do we automate code testing?" Considerations · **TW** testing-guidance § "Consider how long it takes your tests to run" · **MS** CI-CD/continuous-integration § "End-to-End Integration Tests" — 4 sources.

### G6.15 (SHOULD) Tier how often tests run according to their run time
Run light tests on every change, and run time-consuming tests on a schedule, such as nightly or weekly. Keep running them periodically even while development is paused, to detect breakage caused by external changes.
> Sources: **BSSw** §Discussion 2 · **TW** testing-guidance § "Run the tests"; testing-checklist § "Good practice checks" · **RSQ** software_maintenance § "How do you maintain your research software over time?" Solutions — 3 sources.

### G6.22 (SHOULD) Make it possible to run all tests with a single command, and make the results easy to understand
Make it possible to run all tests with a single command, and make the output understandable to non-specialists (for documenting how to run them, see G8.10).
> Sources: **MS** CI-CD/continuous-integration § "End-to-End Integration Tests", § "Reporting Build Failures" · **TW17** Rule 9 · **TW** testing-guidance § "Document the tests and how to run them"; testing-checklist § "Good practice checks" · **OSG** best-practices / Require tests and other checks… · **W17** 3a, §Collaboration — 5 sources.

### G6.23 (SHOULD) Test in an environment close to operational use and on all supported platforms
Test basic functionality in an environment close to the operational one, and always do so before a release. Confirm that the software works on each supported environment (operating system, etc.).
> Sources: **DLR** EST.4, §Software Test [AC1+] · **MS** CI-CD/continuous-integration § "Isolated Environments", § "Test in a Clone of Production", § "Promote Infrastructure Changes Across Fixed Environments" · **RSQ** quality § "Aspects of Research Software Quality"; life_cycle § "QA & Documentation"; testing_software § "How do we automate code testing?"; ci_cd § "Continuous Integration (CI)", § "Considerations"; using_version_control § "How do you implement version control in your research workflow?" Solutions; code_review § "Solution - code review tips & tools" · **TW17** Rule 7 · **N7009** App. E.3.3 · **TW** testing-acceptance-regression § "Regression testing" — 4 sources.

#### Maintaining tests

### G6.5 (MUST) In collaborative development, include tests for behavior changes in the same change
For a PR that adds or changes behavior, add new tests or update existing ones that verify it, and include them in the same PR. Do not settle for "tests later."
> Sources: **CP** §Contributing PRs (must) · **GEP** review/reviewer/looking-for § "Tests"; review/developer/small-cls § "Keep related test code in the same CL" · **MS** automated-testing/README § "The Fundamentals"; code-reviews/process-guidance/reviewer-guidance § "Tests"; code-reviews/pull-requests § "General Process", § "Best Practices" · **TW** reviewing-checklist § "For the coder" — 4 sources.

### G6.17 (SHOULD) Have a person check that the tests themselves are valid
In review, have a person check whether the tests actually fail when the code breaks, whether they produce false positives, and whether they rest on reasonable assumptions. Treat tests as code that must also be maintained.
> Sources: **GEP** review/reviewer/looking-for § "Tests" (must) · **MS** code-reviews/process-guidance/reviewer-guidance § "Tests" · **TW** reviewing-checklist § "For the reviewer" · **RSQ** code_review § "Consideration - what to look for in a review?" · **CP** §Changes that are not considered breaking, string representation — 5 sources.

### G6.21 (SHOULD) Manage test code, test data, and run conditions in the repository
Keep test code under version control as part of the codebase, and ideally keep the required data, procedures, and environment parameters in the repository as well. For data that is too large, store a reference to it. Make test data realistic, reflecting the messiness of real data.
> Sources: **RSQ** testing_software § "Why is it important to test our code?" Considerations, § "How do we test our code?" Description · **DLR** EST.10, §Software Test [AC1+] · **MS** CI-CD/continuous-integration § "Test Automation Data Dependencies" · **N7009** 4.2.2e · **N7009H** §5.5.2.3 [M&S 16]; §5.5.3.1 [M&S 18] · **TW** testing-guidance § "Test Realistic Cases" · **W17** 2i, §Software — 7 sources.
> Note: The sources agree and none opposes this, but none states it as a must.

## G7. Automation and CI

### G7.2 (SHOULD) Script repetitive work, and make it possible to build and regenerate everything with a single command
Instead of retyping the same commands by hand, save them in a script and consistently automate routine tasks, especially each step of the build (MUST). Make it possible to build from source and dependencies, or to regenerate the entire analysis from raw data to figures, tables and manuscript, with a single command that does not depend on a particular IDE. Use a build tool (such as Make), a workflow management system, or, for a small project, a single driver script that reruns everything.
> Sources: **W14** Practice 2a; Practice 2c, §Let the Computer Do the Work · **MS** CI-CD/continuous-integration § "Goals", § "Build Task", § "Build Script Target", § "No IDE Dependencies" · **DLR** EAA.1, §Automation and Dependency Management [AC1+]; §Automation and Dependency Management (must) · **TW** make § "Summary", § "Why use Make for Reproducibility?"; code-reuse-overview § "Repeatable Recommendations" · **W17** What we left out, Build tools; 4d, §Project organization, Box 2 · **TW17** Rule 6 · **S13** Rule 1 · **RSQ** quality § "Aspects of Research Software Quality"; reproducible_software_environments § "What are reproducible software environments?" · **N7009H** §5.2.1.2 d; §5.3.2 j–l — 9 sources.

### G7.3 (SHOULD) Set up CI to build and test automatically on every push or PR
On every push or PR to a shared repository, automatically run the build and the tests in an integration environment. Integrate changes frequently in small units.
> Sources: **RSQ** quality § "Aspects of Research Software Quality"; life_cycle § "QA & Documentation"; testing_software § "How do we automate code testing?"; ci_cd § "Continuous Integration (CI)", § "Considerations"; using_version_control § "How do you implement version control in your research workflow?" Solutions; code_review § "Solution - code review tips & tools" · **MS** engineering-fundamentals-checklist § "CI/CD", § "Code Reviews"; CI-CD/continuous-integration § "Build on Commit"; code-reviews/pull-requests intro · **OSG** best-practices / Require tests and other checks… · **DLR** EAA.8, §Automation and Dependency Management [AC2+] · **TW** testing-guidance § "Run the tests"; testing-checklist § "Good practice checks" · **JOSS** RC §Tests — 6 sources.
> Note: JOSS does not require CI and also accepts documented manual procedures [JOSS].

### G7.4 (SHOULD) In collaborative development with CI, make passing CI a condition for merging, and enforce fixed rules mechanically
Set protection rules or merge conditions on the main branch so that changes that fail the build, the tests, or static checks cannot be merged. More generally, enforce rules that must be followed every time without exception through automated checks such as merge conditions, CI gates and hooks, rather than relying on instructions or documents.
> Sources: **CP** §Reviewing, Approving, and Merging PRs; §Guidance on automatically enforcing guidelines · **MS** CI-CD/continuous-integration § "Branch Policy Enforcement"; automated-testing/README § "The Fundamentals"; code-reviews/process-guidance/README § "Automate Whenever Reasonable"; code-reviews/process-guidance/reviewer-guidance intro · **OSG** best-practices / Require tests and other checks… · **TW** reviewing-checklist § "For the coder" · **CC** Set up hooks · **RSQ** testing_software § "What types of software tests exist?" Considerations — 6 sources.
> Note: The sources agree and none opposes this, but none states it as a must.

### G7.5 (SHOULD) Run the build and tests locally before submitting changes
Before committing to a shared branch or opening a PR, run the build, tests, and linters locally, and confirm that all tests, old and new, pass.
> Sources: **MS** source-control/git-guidance/README § "Commit Best Practices"; code-reviews/pull-requests § "General Process", § "Best Practices"; CI-CD/continuous-integration § "Avoid Checking in Broken Builds", § "Everyone Commits to the Git Repository Each Day" (must) · **TW** reviewing-checklist § "For the coder" · **OSG** best-practices / Require tests and other checks… · **W17** 5d, §Keeping track of changes · **DLR** EÄM.8, §Change Management [AC1+] · **CP** §Guidance on contributing PRs — 6 sources.

### G7.6 (SHOULD) Fix broken builds immediately, and make failures visible
Fix problems found by the integration build ahead of other work. Make sure that CI failures are reported to the people involved, together with the logs.
> Sources: **DLR** EAA.8, §Automation and Dependency Management [AC2+] · **MS** engineering-fundamentals-checklist § "CI/CD" · **GEP** review/developer/small-cls § "Don't Break the Build"; § "What is Small?" · **TW** testing-guidance § "Run the tests"; testing-checklist § "Good practice checks" — 4 sources.

## G8. Documentation

#### What to document

### G8.1 (MUST) State in the README what the software is, how to install it and how to use it
State in the README what the software does, what problem it solves and who it is for, and its status, for example that it is unfinished, does not accept contributions, or is not ready for production use. Document the dependencies (required hardware, tested operating systems, libraries) and installation steps that assume no prior knowledge and show every command, and include at least one runnable usage example; if the software cannot be installed from scratch using only the documentation, update the documentation. Also state how to get help and current contact information, how contributions are accepted, the license and attribution, and acknowledgments of funders and contributors (SHOULD).
> Sources: **RSQ** documenting_software_project § "How to document your software project?" Solutions; documenting_code § "Include usage examples", § "Include a quickstart guide and a more detailed tutorial", § "Provide a README"; creating_good_readme § "Usage", § "What sections should you include in your README?" Considerations, § "Contribution", § "Acknowledgements", § "Why does your research software need a good README?" (must) · **TW17** Rule 2, README items 2, 5 and 6 · **OSG** starting-a-project / Launching your own open source project; starting-a-project / Writing a README · **W17** 3a, §Collaboration · **TW** open-checklist § "Open Source Software"; compendia § "Basic Compendium"; reviewing-checklist § "Documentation"; code-reuse-overview § "Documentation" (must) · **JOSS** RC §Documentation, Community guidelines; RC §Good practices · **MS** documentation/README § "Challenges" · **DLR** ERM.2, §Release Management [AC1+] · **NL** best_practices, §Documentation — 9 sources.

### G8.5 (SHOULD) Provide reference documentation for the public API
For libraries and tools that others call, document the public API. Ideally, give every public function an input/output example; at a minimum, document the core API.
> Sources: **JOSS** RC §Good practices · **NL** best_practices, §Documentation · **SEMVER** FAQ "Documenting the entire public API is too much work!" · **CP** §Changes that are considered breaking · **GEP** review/reviewer/looking-for § "Comments" · **RSQ** documenting_code § "Understand purpose and audience"; software_documentation ; documenting_software_project § "How to document your software project?" Considerations — 6 sources.
> Note: TW17 leaves documentation beyond the README and usage to the developer's discretion [TW17].

### G8.7 (SHOULD) Provide different kinds of documentation for different purposes and readers
Provide separate documentation for each purpose and audience, such as for users, for developers, and for installation and deployment. Do not lean toward either internal implementation details only or a minimal quick start only.
> Sources: **NL** best_practices, §Documentation · **RSQ** documenting_code § "Understand purpose and audience"; software_documentation ; documenting_software_project § "How to document your software project?" Considerations · **MS** documentation/README § "What Documentation Should Exist" · **TW** code-reuse-overview § "Documentation" (must) · **DLR** §Software Architecture · **DX** start-here.rst / The four kinds of documentation — 6 sources.
> Note: Sources classify documentation differently (NL uses three levels; RSQ uses users, developers, and deployment; DX uses four kinds), and none mandates a particular classification.

### G8.10 (SHOULD) Document how to set up the development environment and how to run the tests
Describe in one place how to set up a local build environment, the required dependencies, and how to run the tests and what resources they need. If possible, provide a setup script.
> Sources: **MS** CI-CD/continuous-integration § "Document Local Setup", § "Infrastructure Documentation" · **DLR** EÄM.2, §Change Management [AC1+] · **W17** 3a, §Collaboration · **TW** testing-guidance § "Document the tests and how to run them"; testing-checklist § "Good practice checks" · **OSG** best-practices / Require tests and other checks… · **TW17** Rule 9 — 6 sources.

#### Keeping documentation current

### G8.4 (MUST) Update documentation together with changes
For changes that affect the public API, update the public documentation in the same change. For changes that affect how the software is built, installed, used, or released, also update the relevant documentation in the same change, and confirm in review that the update has been made (these are (SHOULD)).
> Sources: **CP** §Contributing PRs (must) · **GEP** review/reviewer/looking-for § "Documentation" · **MS** code-reviews/process-guidance/reviewer-guidance § "Pull Request Overview"; code-reviews/pull-requests § "General Process" · **RSQ** documenting_software_project § "How to document your software project?" Considerations; software_maintenance § "How do you maintain your research software over time?" · **W14** Practice 7c · **DLR** ESA.9, §Software Architecture [AC2+] — 6 sources.

### G8.6 (SHOULD) Generate reference documentation with tools, and version it in the repository
Generate reference documentation from the docstrings and structured comments described in G5.19 with a documentation generator. Keep the documentation in the repository, version it in the same workflow as the code, and, if possible, generate and publish it in CI. Do not regard automatically generated reference material alone as sufficient documentation.
> Sources: **W14** Practice 7c · **RSQ** documenting_code § "Use automated documentation tools", § "Version control your documentation" · **DLR** ERM.2, §Release Management [AC1+] · **DX** reference.rst / Reference as description — 4 sources.

### G8.8 (SHOULD) Update outdated documentation, delete it, or mark it as outdated
When documentation no longer matches the implementation, update it. If you cannot update it, delete it or mark it clearly as outdated. Outdated documentation can do more harm than no documentation.
> Sources: **OSG** best-practices / Documenting your processes · **NL** CONTRIBUTING, §Zen of the Guide 7–8 · **MS** documentation/README § "Challenges" · **DLR** ESA.9, §Software Architecture [AC2+] · **RSQ** documenting_software_project § "How to document your software project?" Considerations; software_maintenance § "How do you maintain your research software over time?" — 5 sources.

### G8.11 (SHOULD) Do not postpone documentation; document continuously from early in development
Do not produce documentation all at once at the end; write it throughout development. Write a README even while the software is unfinished. Even a bulleted list is better than nothing.
> Sources: **MS** documentation/README intro, § "Challenges" · **RSQ** documenting_code § "Document as you code" · **OSG** starting-a-project / Writing a README · **W17** 2a, §Software — 4 sources.

## G9. Versioning and releases

#### Version numbers and tags

### G9.1 (SHOULD) Give each release a unique version number and a tag, and tag the commits behind a paper's results
Give every release that you distribute to others or cite in a paper a unique version number, and make the originating commit identifiable with a version-control tag. When you publish a paper that used the software, release the software at the same time and tag the exact commit that produced the results (for archiving and DOIs, see S11.7); distinguish submitted and thesis versions by tags or releases, not by version numbers in file names. Make the version number displayable by the software itself (TW17 only).
> Sources: **DLR** ERM.1, §Release Management [AC1+] · **TW17** Rule 4 · **RSQ** releasing_software § "How to Create Code Releases" Solutions; using_version_control § "Why does version control matter for your research software?" Solutions, § "How do you implement version control in your research workflow?" Solutions; software_project_structure § "Use version control" · **JOSS** RC §Good practices · **NL** best_practices, §Releases · **SEMVER** FAQ "Is "v1.2.3" a semantic version?" · **S13** Rule 4 · **W17** 2j, §Software — 8 sources.

### G9.2 (SHOULD) Do not modify released versions, and keep past versions available
Do not change the contents of a version once it has been released. Release every fix as a new version. Keep past versions available. If you adopt SemVer, not changing the contents of released versions is (MUST).
> Sources: **SEMVER** Specification §3 [if SemVer] (must) · **TW17** Rule 4 · **RSQ** fair_rs § "How can we make our software accessible?" — 3 sources.

### G9.3 (SHOULD) Decide on and declare a versioning scheme (with SemVer as the first choice)
Decide which versioning scheme to use, and declare it in the README or the changelog. If you want to convey the distinction between breaking changes, new features, and bug fixes, use Semantic Versioning and link to the specification from the README.
> Sources: **RSQ** releasing_software § "How to Create Code Releases" Solutions · **MS** source-control/component-versioning § "Version Numbers and Versioning Schemes", § "Semantic Versioning" · **CP** §Guidance on Package Releases, Incrementing the package version · **SEMVER** Why Use Semantic Versioning? · **KC** Guiding Principles · **TW17** Rule 4 · **DLR** ERM.1 · **TW** renv § "What is a Computational Environment?" — 5 sources.
> Note: RSQ also lists calendar versioning as an option.

### G9.4 (MUST) If you declare SemVer, increment version numbers according to its rules
Use version numbers of the form X.Y.Z, and increment MAJOR when you make backward-incompatible changes to the public API, MINOR for backward-compatible feature additions or deprecations, and PATCH for backward-compatible bug fixes only.
> Sources: **SEMVER** Specification §2 (must) · **MS** source-control/component-versioning § "Version Numbers and Versioning Schemes", § "Semantic Versioning" · **RSQ** software_maintenance § "How do you maintain your research software over time?" Solutions · **CP** §Guidance on Package Releases, Incrementing the package version · **CCOM** FAQ "How does this relate to SemVer?" — 5 sources.

#### Breaking changes and deprecation

### G9.6 (SHOULD) Judge breaking changes against the public API, and state them explicitly
Judge whether a change is breaking by whether it breaks functionality of the declared public API, and state explicitly, at the time a PR is opened, that it contains a breaking change. ColPrac holds that specific floating-point values may change at any time and that users should rely only on approximate accuracy, and it regards changes that break documentation examples or tutorials as breaking (single source).
> Sources: **SEMVER** Specification §8 (must) · **CP** §Changes that are considered breaking · **CCOM** Summary · **MS** source-control/component-versioning § "Version Numbers and Versioning Schemes", § "Semantic Versioning" · **RSQ** software_maintenance § "How do you maintain your research software over time?" Solutions — 5 sources.

### G9.7 (SHOULD) Announce deprecations, and remove only after at least one intervening release
When deprecating functionality of the public API, announce it in the documentation and the changelog, issue at least one release that contains the deprecation, and then remove the functionality in the next major version.
> Sources: **SEMVER** FAQ "How should I handle deprecating functionality?" · **CP** §Incrementing the package version · **KC** Ignoring Deprecations · **GEP** review/reviewer/looking-for § "Documentation" — 4 sources.

### G9.10 (SHOULD) After a mistaken release, revert it in a new patch version and flag the bad version
If you mistakenly release a backward-incompatible change in a non-major version, immediately release a new patch version that reverts the offending change, and decide how to proceed after that. Record the problematic version in the changelog, and mark yanked versions prominently.
> Sources: **SEMVER** FAQ "What do I do if I accidentally release…" (must) · **CP** §Accidental breaking releases · **KC** FAQ "What about yanked releases?" — 3 sources.

#### Changelogs, release procedure and distribution

### G9.9 (SHOULD) Maintain a changelog written for people to read
Keep in the repository a changelog (CHANGELOG.md) that records the notable changes in each version, and update it before release work. Put the newest version first, give each version its release date, and group changes by type (Added / Changed / Deprecated / Removed / Fixed / Security). Do not use a diff of commit logs as the changelog as is.
> Sources: **DLR** EÄM.6, §Change Management [AC2+] · **RSQ** releasing_software § "How to Create Code Releases"; software_maintenance § "How do you maintain your research software over time?" Solutions; documenting_software_project § "How to document your software project?" Solutions · **KC** How do I make a good changelog? / Guiding Principles · **W17** 5f, Manual versioning · **JOSS** SUB §Pre-review screening criteria, 3 [JOSS] (must) — 5 sources.

### G9.11 (SHOULD) Provide release notes based on the changelog
With each release, provide brief release notes for end users, based on the changelog, that also list known issues that remain unfixed.
> Sources: **DLR** ERM.2, §Release Management [AC1+] · **RSQ** releasing_software § "How to Create Code Releases"; software_maintenance § "How do you maintain your research software over time?" Solutions; documenting_software_project § "How to document your software project?" Solutions · **N7009H** §5.5.5.3 Note — 3 sources.

### G9.12 (SHOULD) Document the release procedure, and automate most of it
Agree on and document the procedure for creating and approving releases, and automate most of it. Also define a shortened procedure for releasing fixes for critical errors quickly.
> Sources: **DLR** ERM.4, §Release Management [AC2+] · **MS** CI-CD/continuous-integration § "Branch Strategy", § "Developer Access to the Latest Release Artifacts" · **CP** §Releases — 3 sources.

### G9.15 (SHOULD) Choose a distribution method suited to the intended users
Choose the distribution method (tags, the hosting service's release feature, package registries) according to the number and expertise of the intended users. Distribution through a registry is optional.
> Sources: **TW17** Rule 4 · **RSQ** packaging_software § "Considerations", § "Solutions", § "Software Package Registries" · **NL** best_practices, §Packaging — 3 sources.

## G10. Code review and collaboration

For collaborative development practices, the level the sources demand differs clearly with project size and number of people. W17 drops code review from its recommendations for novices and small groups [W17], ColPrac states that it is not suited to projects with a single maintainer [CP], and DLR requires structured review from DLR application class 3 [DLR].

#### Pull requests and merging

### G10.1 (SHOULD) Have someone other than the author review shared code before it is merged
Do not change the main branch directly; create a working branch for each bug fix or feature, and merge it only after review and testing through a pull request. Before shared code that several people change is merged into the main branch, have someone other than the author review it on the pull request.
> Sources: **W14** Practice 8a, §Collaborate · **RSQ** code_review § "Solution - code review tips & tools"; using_version_control § "How do you implement version control in your research workflow?" Solutions · **MS** code-reviews/README intro, § "Goals"; code-reviews/process-guidance/README § "General Guidance"; engineering-fundamentals-checklist § "Source Control"; source-control/README § "Creating a New Repository"; source-control/git-guidance/README § "Branching"; CI-CD/continuous-integration § "Branch Policy Enforcement"; code-reviews/pull-requests intro (must) · **CP** §Contributing PRs; §Reviewing, Approving, and Merging PRs (must) · **DLR** EDI.11, §Design and Implementation [AC3+] · **JOSS** RC §Collaborative effort · **NL** best_practices, §Code Reviews; CONTRIBUTING, §Technical · **TW** testing-checklist § "Good practice checks"; reviewing § "Summary"; vcs-checklist § "Make Use of Git" · **TW17** Rule 1 — 9 sources.
> Note: Informal review is beneficial even at small scale [TW], and having students show their code at lab meetings is a lightweight alternative [W17].

### G10.2 (MUST) In repositories maintained by several people, do not approve your own changes
Require at least one approval from someone other than the author for merging, and enforce the required number of approvals mechanically through the repository settings.
> Sources: **CP** §Reviewing, Approving, and Merging PRs (must) · **MS** engineering-fundamentals-checklist § "Code Reviews"; source-control/README § "Creating a New Repository"; code-reviews/pull-requests intro · **DLR** EDI.11, §Design and Implementation [AC3+] — 3 sources.
> Note: The required number differs among sources (CP: one; MS: usually two; DLR: one or two).

### G10.3 (SHOULD) Keep changes small and focused on a single purpose
Make each PR the smallest self-contained unit that does only one thing, and err on the side of too small rather than too large; the rules for separating commits (G3.6) apply to PRs as well.
> Sources: **GEP** review/developer/small-cls § "Why Write Small CLs?" · **MS** code-reviews/process-guidance/README § "General Guidance", § "Code Reviews Shouldn't Include too Many Lines of Code"; code-reviews/pull-requests § "Size Guidance", § "Best Practices" · **CP** §Guidance on contributing PRs — 3 sources.
> Note: GEP only offers as a rule of thumb that "100 lines is usually reasonable, and 1000 lines is usually too large" [GEP]. See Appendix B.

### G10.7 (MUST) Clean up new complexity in the current PR, and file out-of-scope problems as separate issues
Clean up changes that introduce new complexity before merging, except in emergencies. Do not defer in-scope fixes that have been requested on the grounds of "doing it later." File existing out-of-scope problems as separate issues, and do not hold up the current PR.
> Sources: **GEP** review/reviewer/pushback § "Cleaning It Up Later" (must) · **MS** code-reviews/process-guidance/author-guidance § "Be Open to Receive Feedback" (must) — 2 sources.

### G10.21 (SHOULD) Add annotations that help the review
When you submit a PR, confirm that it meets the project's standards (for the local checks, see G7.5), and point out in comments the reasons for the changes and the parts you especially want reviewers to look at.
> Sources: **TW** reviewing-checklist § "For the coder" · **MS** code-reviews/pull-requests § "General Process", § "Best Practices" · **CP** §Guidance on contributing PRs — 3 sources.

#### Giving and receiving review

### G10.5 (SHOULD) In review, look at the design first and give it the most weight
As a reviewer, check the design (the overall structure and its integration with the existing system), functionality, unnecessary complexity, adequacy of the tests, naming and comments, style, and updates to related documentation. Design is the most important aspect.
> Sources: **GEP** review/index § "What Do Code Reviewers Look For?" · **MS** code-reviews/process-guidance/reviewer-guidance intro · **RSQ** code_review § "Consideration - what to look for in a review?" · **TW** reviewing-checklist § "For the reviewer" · **DLR** EDI.11, §Design and Implementation [AC3+] — 5 sources.

### G10.10 (SHOULD) Write comments respectfully, about the code rather than the person, and in the form of questions
Write review comments that are courteous, clear, and helpful. Write about the code rather than about the author, and prefer questions to assertions. Do not expect experts in a research field to have complete knowledge of advanced software engineering.
> Sources: **GEP** review/reviewer/comments § "Courtesy" · **MS** code-reviews/process-guidance/reviewer-guidance § "Foster a Positive Code Review Culture", § "Be Considerate" · **RSQ** code_review § "Consideration - what not to look for in a review?", § "Solution - code review tips & tools" · **CP** §Guidance on reviewing PRs · **COC** Our Standards — 5 sources.

### G10.11 (SHOULD) Distinguish nits with labels such as "Nit:", and do not let them block progress
Mark comments that do not require action with "Nit:" (or Optional / FYI), so that the author knows they need not be addressed in this PR. Comments meant for learning may be left at any time, as long as they are labeled.
> Sources: **GEP** review/reviewer/standard intro; § "Mentoring" · **MS** code-reviews/process-guidance/reviewer-guidance § "Be Considerate" · **RSQ** code_review § "Consideration - what not to look for in a review?" · **CP** §Guidance on reviewing PRs — 4 sources.

### G10.13 (SHOULD) Set a target response time for reviews, and return the first response quickly
Set and document a target response time for review requests, and return the first response within it. When you cannot look at the whole change right away, say when you can, or suggest another reviewer. What matters is the speed of individual responses rather than the speed of the whole process.
> Sources: **GEP** review/reviewer/speed § "How Fast Should Code Reviews Be?" · **MS** engineering-fundamentals-checklist § "Code Reviews"; code-reviews/process-guidance/README § "General Guidance" · **OSG** best-practices / Communicate your expectations — 3 sources.
> Note: Targets differ greatly among sources. GEP sets a maximum of one business day for in-house full-time developers, while OSG says that volunteer maintainers should be honest about the time they have available.

### G10.15 (SHOULD) As an author, do not take criticism as a personal attack, and respond to every comment
Read the constructive intent in review criticism and respond to it. When you make a fix, mark the comment as resolved; when you do not, give a clear reason. Do not reply in anger: step away until you have calmed down and then reply politely, because replies remain in the review tool permanently (MUST).
> Sources: **GEP** review/developer/handling-comments § "Don't Take it Personally" (must) · **COC** Our Standards · **MS** code-reviews/process-guidance/reviewer-guidance § "Foster a Positive Code Review Culture", § "Be Considerate" — 3 sources.

#### Issues and communication

### G10.25 (SHOULD) Record reproduction steps, severity, and affected versions in bug reports
For bug reports, record in addition to the basics of G2.5 how to reproduce the bug, its severity, the affected versions and the submitter's contact information. Projects that receive reports from outside should describe how to report in CONTRIBUTING and consider using templates.
> Sources: **DLR** EÄM.3, §Change Management [AC2+] · **MS** engineering-fundamentals-checklist § "Engineering Feedback" · **OSG** starting-a-project / Writing your contributing guidelines — 3 sources.
> Note: No source makes templates mandatory.

### G10.26 (SHOULD) Discuss large changes in an issue before starting work
Discuss large changes and new features in an issue and reach agreement before starting work on them.
> Sources: **CP** §Guidance on contributing PRs · **NL** CONTRIBUTING, §For significant changes / additions · **TW** vcs-checklist § "Contribute to Someone Else's Project"; vcs § "Motivation" · **GEP** review/reviewer/navigate § "Step One: Take a broad view of the change" · **OSG** best-practices / Be proactive — 5 sources.

### G10.30 (SHOULD) Decide on and publish the channels for communication, support, and feedback
Explicitly decide on the channels for communication among members and with external users. Publish the point of contact where users can report anomalous results or problems in the README (G8.1).
> Sources: **W17** 3c, §Collaboration · **RSQ** life_cycle § "Community Feedback"; software_maintenance § "How do you maintain your research software over time?" Solutions · **JOSS** RC §Good practices · **N7009** 4.2.2f — 4 sources.

### G10.31 (SHOULD) Hold discussions in shared venues, and record conclusions in PRs or issues
Hold discussions about the project in shared venues, such as issues and PRs, whenever possible. For decisions made in private conversations or meetings, also record what was agreed and why.
> Sources: **OSG** best-practices / Keep communication public · **MS** code-reviews/process-guidance/author-guidance § "Be Open to Receive Feedback"; code-reviews/process-guidance/reviewer-guidance § "Be Considerate" · **GEP** review/reviewer/standard § "Resolving Conflicts" · **JOSS** SUB §Review Process — 4 sources.

#### Team practices

### G10.23 (SHOULD) Agree as a team on the review procedure, roles, and checklist
Agree on and document the review roles and procedure, and review them periodically. Treat checklist items that do not apply as described in G1.7.
> Sources: **MS** engineering-fundamentals-checklist § "Code Reviews"; code-reviews/process-guidance/reviewer-guidance intro · **DLR** §Change Management · **TW** reviewing-checklist § "Checklist for code review process" · **NL** best_practices, §Checklists · **CX** Improve reliability with testing and review — 5 sources.

### G10.32 (SHOULD) Use code review for knowledge sharing and learning
Use review not only to find defects but also to share knowledge and learn within the team. Include members who are not familiar with the project or the language as reviewers. In labs where members change, this prevents knowledge from being lost when people leave.
> Sources: **MS** code-reviews/README intro, § "Goals"; code-reviews/process-guidance/README § "General Guidance" · **RSQ** code_review § "Why it matters in research?" · **W14** §Collaborate · **NL** best_practices, §Code Reviews · **GEP** review/reviewer/standard intro; § "Mentoring" — 5 sources.

### G10.34 (SHOULD) Label issues for newcomers, and show ongoing contributors a path to responsibility
Label issues that new contributors can easily take on with a label such as "good first issue." Document the path by which ongoing contributors can gain merge rights and similar responsibilities.
> Sources: **OSG** best-practices / Share the workload · **RSQ** life_cycle § "Community Feedback"; software_maintenance § "How do you maintain your research software over time?" Solutions · **CP** §Becoming a Collaborator — 3 sources.

### G10.35 (SHOULD) In projects with several participants, adopt an existing code of conduct early, and enforce it once adopted
Establish a code of conduct as early as possible and follow it in all interactions; do not write your own, but adopt an existing code such as the Contributor Covenant and place it at the repository root as CODE_OF_CONDUCT. Once you adopt one, make sure it states the expected and unacceptable behavior, its scope, the response to violations and a private way to report them, decide and publish who enforces it before any violation occurs, and protect the privacy and safety of reporters (MUST). Investigate every report promptly and fairly, tell the reporter the conclusion and the reasons even when you find no violation, and escalate measures in proportion to the impact (MUST).
> Sources: **OSG** code-of-conduct / Establishing a code of conduct; code-of-conduct / Gather information about the situation · **RSQ** documenting_software_project § "How to document your software project?" Solutions · **CP** §Community Standards (must) · **COC** Our Pledge; Our Standards; Enforcement (must) — 4 sources.
> Note: Only OSG requires a code of conduct for "all projects"; RSQ limits it to projects with multiple contributors. A code of conduct that is not enforced is worse than none [OSG].

### G10.38 (SHOULD) Use welcoming, inclusive, and plain language
Use welcoming and inclusive language in documentation and interactions, and write in plain language for readers whose first language is not English.
> Sources: **OSG** starting-a-project / How you write (and code) affects your brand, too! · **COC** Our Pledge (must) · **MS** code-reviews/process-guidance/README § "General Guidance", § "Measuring Code Review Process" — 3 sources.

## G11. Security and secrets

### G11.6 (SHOULD) Apply least privilege to access rights and privileges
Grant access to repositories and cloud environments only to the people who need it, when they need it, and periodically review who has access. Except in very special circumstances, do not require root or other privileges to install or use the software you build. TW17 gives as reasons that a bug then behaves much like malicious software, and that such requirements hinder trial use on clusters.
> Sources: **MS** engineering-fundamentals-checklist § "Security"; CI-CD/continuous-integration § "Developer Read-Only Access to Cloud Resources" · **RSQ** using_version_control § "How do you implement version control in your research workflow?" Solutions · **TW17** Rule 7 — 3 sources.
> Note: Balance least privilege against G13.1, which asks for at least two people with administrator rights.

### G11.7 (SHOULD) Check for security flaws in code review
During review, check for security flaws: besides the error and input handling covered in G5.7 and G5.8, the sources list improperly encoded output and the handling of invalid parameters. If any part, such as security or privacy, is outside what you are qualified to judge, add a qualified reviewer.
> Sources: **MS** code-reviews/process-guidance/reviewer-guidance § "Functionality" · **TW** reviewing-checklist § "Security of new codes" · **GEP** review/reviewer/looking-for § "Every Line" — 3 sources.

## G12. AI coding agents

Much of the evidence in this section comes from the product documentation of two vendors of AI coding agents (CC, CX;), which is revised frequently, and CC itself presents its patterns as starting points rather than fixed rules [CC].

### G12.1 (SHOULD) Hold AI-assisted work to the same standards and checks as human work
Require the same correctness and quality of code, READMEs and documents written with AI assistance as of handwritten ones, and accept them only after they pass the same checks (tests, static analysis such as linting and type checking, review of the diff). Before publishing a README or similar material drafted with AI, verify that its commands, requirements and citation metadata are correct.
> Sources: **RSQ** static_analysis § "How do you use static analysis to improve the quality of your research software?" Considerations; creating_good_readme § "What sections should you include in your README?" Considerations · **JOSS** SUB §AI Usage Policy, Author use [JOSS] (must) · **CX** Improve reliability with testing and review — 3 sources.
> Note: No source explicitly states that human review procedures (approvers, merge rights) apply unchanged to changes made by AI.

### G12.13 (MUST) When submitting to JOSS, follow the JOSS AI policy (single source)
Observe the following.
- Include a section in the paper disclosing the use of generative AI, stating the tools and models used and their versions, where they were used, the nature and extent of the assistance, and how the quality and correctness of the generated output were verified. If AI was not used, say so.
- Human authors review, edit and verify all AI-assisted output, make the problem framing, key design decisions and architectural choices themselves, and state that they have done so.

> Sources: **JOSS** RC §Software paper content, AI usage disclosure [JOSS] (must) — 1 source.
> Note: In the original, including the disclosure section is must, while stating non-use and describing how AI was used and how the output was verified are should. Incomplete or inaccurate disclosure may be treated as an ethics violation (JOSS).

## G13. People and operations

### G13.1 (SHOULD) Keep knowledge in the repository rather than in individuals' heads, and do not depend on a single maintainer
For each piece of shared or published software, designate a person or organization responsible for its quality and maintenance, and decide before publishing who will respond to issues and PRs. Document important decisions, architecture and operational knowledge in the repository itself rather than in any one person's memory. Have at least two people hold administrator rights and ownership; a sole maintainer should, where possible, share ownership with someone who can act in their absence.
> Sources: **RSQ** software_maintenance § "How do you maintain your research software over time?"; code_review § "Why it matters in research?" · **OSG** starting-a-project / Your pre-launch checklist; starting-a-project / Setting your goals · **DLR** §Definition of the intended Application Class, Figure 1; "Period of further development" (must) · **MS** documentation/README intro, § "Goals" · **W14** §Document Design and Purpose, Not Mechanics · **N7009** 4.1.1.3 [M&S 41] [NASA scope] (must) · **F4RS** FAIR research software examples — 7 sources.
> Note: No source specifies the authority, term, or succession procedure for the responsible person.

### G13.3 (SHOULD) Set up project and team practices so that new members can join easily
Even in a project that started small, make it possible for new collaborators (including yourself after a period away) to set up the environment (G8.10), find tasks they can work on, and understand how to contribute. Write down the team's workflow in a team manual or similar document and keep it up to date.
> Sources: **W17** §Collaboration · **MS** documentation/README intro, § "Goals" · **RSQ** using_version_control § "How do you implement version control in your research workflow?" Solutions · **TW** rdm § "Motivation and Background" · **NL** README, §Guide / §Resources · **OSG** best-practices / Embrace mentorship — 6 sources.

### G13.4 (SHOULD) Provide training and tools for the skills the work requires
Fill gaps in skills with training that covers at least programming languages, version control and the use of development tools, and provide the necessary tools.
> Sources: **DLR** §Qualification · **N7009** 4.1.4a · **RSQ** using_version_control § "How do you implement version control in your research workflow?" Solutions · **NL** best_practices, §Know your tools · **TW** overview-barriers § "Requires additional skills" — 5 sources.

# Part II: Additional practices for scientific computing

## S1. What is different about research software

### S1.4 (SHOULD) Distinguish being reproducible, being correct and being open
Distinguish being reproducible from being correct (for checking correctness, see S3.2), being reproducible from being open, and being FAIR from working correctly. Reproducibility terms can have opposite meanings in different fields.
> Sources: **TW** overview-definitions § "Definitions", § "Table of Definitions for Reproducibility" · **N7009H** §3.2 · **S13** Rule 6 · **RSQ** quality § "FAIR Research Software"; fair_rs § "Tools and practices for FAIR" — 2 sources.
> Note: The definitional frameworks differ among the sources (TW uses four categories; N7009H uses three: repeatability, reproducibility and replicability), and there is no basis for standardizing on either.

### S1.6 (SHOULD) Make it work correctly first, and optimize later
Optimize only after the software works correctly. Before optimizing, determine whether performance is actually a bottleneck.
> Sources: **W14** Practice 6, §Optimize Software Only after It Works Correctly · **W17** What we left out, Profiling and performance tuning — 2 sources.
> Note: No source gives an overall order of priority among correctness, reproducibility, readability and performance.

## S2. Documenting the model, its assumptions and its domain of validity

### S2.1 (SHOULD) Record the model's assumptions, abstractions and known issues
For simulation and analytical models, record the assumptions and abstractions underlying the conceptual model and the implementation (what was included and what was left out), together with their rationale and their effect on the intended use. Also make known issues and constraints explicit, and describe surrogate models (surrogates and ML models) as inheriting the assumptions and limitations of the original model. For models that support critical decisions, recording the assumptions and abstractions is required (MUST).
> Sources: **N7009** 4.2.1.4 [M&S 11] [NASA scope] (must) · **N7009H** §4.4 b–f · **DLR** §Application Class 1 — 3 sources.
> Note: DLR supports only the part about making known issues and constraints explicit (the definition of application class 1).

### S2.2 (SHOULD) Document permissible uses and the cases in which the model must not be used
Document the "permissible uses," as determined by the intended use, the assumptions, the limitations and the verification and validation domains, together with details of usage and calibration. Also describe the cases in which the model must not be used, with the rationale. For models that support critical decisions, recording the permissible uses is required (MUST).
> Sources: **N7009** 4.2.1.7 [M&S 14] [NASA scope] (must) · **N7009H** §4.4 b–f — 2 sources.

### S2.3 (SHOULD) Record the verification domain, the validation domain and the limits
Record the range of inputs over which the model was verified (the verification domain), the range over which it agreed well with referent data (the validation domain), and the limits within which it is designed to operate. Agreement at a single point is only point validation, so establish the domain by evaluating at each point as the inputs are varied. Extrapolation beyond the domain is possible only within the limits of the model.
> Sources: **N7009** 4.2.3.2 [M&S 16] [NASA scope] (must) · **N7009H** §3.2 — 2 sources.
> Note: N7009H itself acknowledges that exploratory research often uses models outside their domain [N7009H].

### S2.4 (SHOULD) Maintain a user guide
Maintain a guide to using the model or analysis software that includes the following. For models that support critical decisions, this is required (MUST). For existing or commercial models, documentation of the concept, structure and mathematics may in some cases be replaced by a reference to a published user guide.
- Good practice for setup, execution and analysis of results, and calibration of parameters
- Computational requirements (hardware and software versions, memory, disk, compile options) and criteria for obsolescence
- The concept, structure and mathematics of the model (the equations solved and their sources, the methods)
- All inputs with their permissible ranges, accuracy, and the treatment of uncertainty
- Examples of expected results (including examples of good and poor agreement with referent data)
> Sources: **N7009** 4.2.1.9 [M&S 47] [NASA scope] (must) · **N7009H** §5.4.1 h — 2 sources.
> Note: The table of contents for the guide (N7009H) is a suggestion, and its details are optional.

## S3. Verification and validation

#### Checking correctness

### S3.1 (SHOULD) Distinguish verification from validation (single source)
Distinguish verification (confirming that the implementation behaves according to the specification or mathematical model and meets its accuracy targets) from validation (confirming, by comparison with referent data, how well the model or computation represents reality for the intended use). Record and report separately which of the two was done. Satisfying verification in the software engineering sense does not establish agreement with reality.
> Sources: **N7009** §3.2 Validation · **N7009H** §4.7 · **BSSw** §Types of Tests, Verification Tests · **RSQ** testing_software § "What is code testing?" Considerations — 1 source.
> Note: The scope of the terms differs slightly among the sources. RSQ calls "the output is correct" validation, which is broader than NASA's usage, while BSSw restricts validation to that based on UQ and experimental data.

### S3.2 (MUST) Check the correctness of results separately from passing tests or reproducibility
Check the correctness of scientific computing results separately from whether the tests pass or whether the same results can be reproduced. The means include comparison with known solutions (including analytical solutions), simplified cases, experimental data, and trusted existing programs or alternative implementations (a prototype in a high-level language, a different model), as well as discussion with colleagues.
> Sources: **DLR** EST.4, §Software Test [AC1+] (must) · **TW** overview-barriers § "Being reproducible does not mean the answer is right" · **W14** §Plan for Mistakes · **N7009H** App. E.2 Note — 4 sources.
> Note: No source indicates how to choose among the means or how to prioritize them. What is mandatory is checking correctness; the choice of means is optional.

### S3.3 (MUST) Verify the correctness of regression-test reference outputs before relying on them
Regression tests that only compare against past outputs show only that "nothing has changed." If you use their reference outputs as grounds for the correctness of results, verify the correctness of those reference outputs separately and independently. When regenerating the reference, also verify the new reference outputs before adopting them.
> Sources: **BSSw** §Types of Tests, No-Change/Characterization Tests (must) · **TW** testing-acceptance-regression § "Limitations of Regression Testing" — 2 sources.
> Note: Regression tests are useful in themselves, and BSSw considers unit-level characterization tests sufficient to drive refactoring [BSSw].

### S3.5 (SHOULD) Evaluate existing software before relying on it
Treat the libraries and third-party tools you use as subjects of evaluation too, and confirm that they fit the purpose and are trustworthy (by checking the documentation, testing reproducibility, and observing behavior when parameters are varied) before relying on them. Do not use the default settings of statistical methods or tools without understanding what they do.
> Sources: **RSQ** life_cycle § "Use & Evaluation" · **W17** 2e, §Software · **TW** overview-barriers § "Being reproducible does not mean the answer is right" · **N7009** App. E.2 — 4 sources.
> Note: No source indicates how thorough the evaluation should be.

#### Verification tests

### S3.4 (SHOULD) Choose verification and validation test cases that cover the limits of applicability
Choose the test cases used in verification and validation (input-output pairs for confirming correct execution) so that they cover the range of the defined limits of applicability; keep them and the referent data with the other tests and rerun them as regression tests (G6.21, G6.4).
> Sources: **N7009** 4.2.2e · **N7009H** §5.5.2.3 [M&S 16]; §5.5.3.1 [M&S 18] — 2 sources.
> Note: This presupposes that the stored reference outputs have been verified (S3.3).

### S3.6 (SHOULD) Write verification tests so that pass or fail follows from mathematical properties or the specification
Write tests that check whether the implementation correctly implements the intended algorithm so that, based on the algorithm's mathematical properties or a clear specification, the requirement is evident from the test's specification and pass/fail criteria alone (for example, the conjugate gradient method fully solves a linear system with N distinct eigenvalues in exactly N iterations). For code verification, perform inspection, code tracing, unit testing, and comparison of the implementation with the conceptual and mathematical models.
> Sources: **BSSw** §Types of Tests, Verification Tests · **N7009H** §5.5.2.2 a; §5.5.2.3 · **N7009** App. E.3.3 — 2 sources.

### S3.7 (SHOULD) Detect impossible values and conditions that invalidate results
Insert checks or assertions that detect conditions that can invalidate results, such as physically or mathematically impossible states (for example, a particle exceeding the speed of light), function evaluations outside the domain, division by zero, inputs outside the range of a lookup table, and reaching the maximum number of iterations before convergence. For input checks and negative tests in general, see G5.7 and G6.18.
> Sources: **N7009H** §5.4.2 f–i · **W14** Practice 5a, §Plan for Mistakes · **TW** testing-overview § "Overview of Testing Types" — 3 sources.
> Note: One source states that when run-time constraints are tight, the checks may be placed under conditional compilation [N7009H].

#### Validation and records

### S3.8 (SHOULD) Perform validation and calibration after verification, and record what was calibrated and its domain
Perform validation by comparison with referent data, and parameter calibration, after the implementation has been verified. If you calibrate, record what was calibrated and its domain of application, and check the results against data not used for calibration (the sources give this as an example of a means). If calibrating a verified model does not achieve the required agreement, question the model's assumptions or the design itself.
> Sources: **N7009H** §5.5.1; App. D.5 Note · **N7009** 4.2.4a — 2 sources.
> Note: The body of N7009 states that V&V often occurs cyclically, depending on the development process, and does not impose a strict one-way order.

### S3.9 (SHOULD) Record the verification and validation methods used, their status, and what was not done
Record the verification methods used, the verification status of each of the conceptual, mathematical and computational models, and the validation methods (including experimental design and analysis), metrics, referent data and results. For verification, validation and uncertainty assessment, also record the level reached and the aspects that were not addressed, with the reasons; citing existing evidence such as papers, reports or user guides is enough, and no new document is needed. For models that support critical decisions, performing verification and validation itself is required (MUST).
> Sources: **N7009** 4.2.3.1 [M&S 15]; §1.1 [NASA scope] (must) · **N7009H** §5.5.2; App. D.4; §4.4 Note — 2 sources.
> Note: The standard requires a record of what was and was not done rather than particular methods, and it does not set the level to be achieved for each factor.

### S3.10 (SHOULD) Assess the quality of referent data, and judge agreement by both the mean difference and the uncertainty
Assess the provenance, acquisition and processing methods, and uncertainty of the referent data used for validation with the same rigor as the verification of the model. Data acquired for other purposes (such as health monitoring) may differ from the data needed for validation in both purpose and tolerance, so confirm that they are compatible. In judging agreement, consider both the difference in means and the spread; use overlaid plots with uncertainties only as a quick check, and use statistical metrics (for example, a t-test) when the overlap is limited.
> Sources: **N7009** §4.2.5 · **N7009H** §5.5.3.1; §5.5.3.2; App. B.2 — 2 sources.
> Note: The choice of specific metrics is left to domain-specific recommended practices.

### S3.11 (SHOULD) Set acceptance criteria and allowable uncertainty before validation (single source)
Decide and agree on the acceptance criteria and allowable uncertainty for judging whether computational results are adequate for their use at or before the start of validation, not after seeing the comparison process or its results. To that end, also decide in advance which referent data to obtain. Setting the criteria after seeing the results biases judgment.
> Sources: **N7009H** §5.5.3.2 — 1 source.

## S4. Floating point and numerical computation

#### Comparing floating-point results

### S4.1 (SHOULD) Assume that floating-point results can change at the bit level
Floating-point results can change at the bit level with changes in the order of operations (including refactoring), compiler and optimization settings, the use of extended precision or fused multiply-add (FMA), math libraries, and the configuration of the OS, hardware and computing infrastructure. A case has been reported in which an equality comparison in the same program gave a different result depending only on whether optimization was enabled.
> Sources: **GB91** § "Languages and Compilers" > "Ambiguity" · **BSSw** §Types of Tests, No-Change/Characterization Tests · **TW17** Rule 10 · **CP** §Changes that are not considered breaking, Floating-point numerical details · **TW** overview-barriers § "Big data and complex computational infrastructure" · **N7009** App. E.3.3 — 3 sources.
> Note: The main text of GB91 (Goldberg) states that if intermediate results differ between IEEE-conforming machines, it is a software bug [GB91]. An addendum by Sun in the same source corrects this, stating that IEEE 754 does not guarantee identical results across implementations.

### S4.2 (SHOULD) Do not make test pass/fail depend on specific floating-point bit patterns
For tests that compare results across code changes or versions, judge pass or fail by approximate accuracy, numerical stability or statistical properties rather than by specific bit patterns, using an explicit tolerance (S4.3). Do not rely on binary-match tests of floating-point output, especially at the integration and system levels, because they fail merely when the order of operations changes and thus hinder refactoring.
> Sources: **CP** §Changes that are not considered breaking, Floating-point numerical details · **BSSw** §Types of Tests, No-Change/Characterization Tests · **TW17** Rule 10 — 3 sources.
> Note: As a goal for reruns of the same version in the same environment, bit-for-bit agreement is supported (S7.9). One source also points out that the difference between exact and approximate reproduction is large and that it is hard to draw conclusions from approximate agreement [S13].

### S4.3 (SHOULD) When comparing within a tolerance, decide the value, record it, and state it in the documentation and tests
When results are compared within a tolerance (floating-point equality checks, convergence checks for iterations, and so on), decide the value explicitly, record it as part of the run configuration, and state it in the documentation and tests.
> Sources: **TW17** Rule 10 · **N7009H** §5.6.2.1, Table 7 · **N7009** 4.3.1.4 [M&S 25] [NASA scope] (must) — 2 sources.
> Note: Comparison within a tolerance is not a cure-all either; deciding the width of the error bound, handling values of opposite sign, and the failure of transitivity are problems [GB91]. No source shows how to choose and justify the tolerance value (the closest is the statement that the required accuracy is determined by the conclusions to be drawn from the results, which only the programmer knows [GB91]).

#### Numerical error

### S4.4 (SHOULD) Estimate and record numerical errors, and include accepted errors in the uncertainty
Identify and estimate the numerical errors in computational results (insufficient discretization, insufficient iterative convergence, numerical approximation, finite-precision arithmetic, sampling and interpolation, and so on), assess their effect on the required accuracy, and record them. If any error sources are not addressed, give the reasons. If you accept a numerical error that is not minimal for the sake of computation time, include the difference between the apparent asymptotic solution and the solution at the adopted settings in the uncertainty of the results.
> Sources: **N7009** 4.2.4b · **N7009H** §5.5.2; App. D.4 — 2 sources.
> Note: No source gives specific methods for error estimation (such as Richardson extrapolation).

### S4.5 (SHOULD) Check convergence by varying implementation-specific parameters, but do not treat convergence as a guarantee of accuracy (single source)
For approximate solutions, systematically vary implementation-specific parameters, such as iterative solver tolerances, time steps and the spatial sampling of the mesh, until the solution converges to its asymptotic limit and stabilizes. Distinguish this from sensitivity analysis, which varies the parameters of the real system. Even if the numerical solution converges and is stable, that does not mean the model meets its accuracy requirements (that is judged by validation).
> Sources: **N7009H** §5.5.2.2 b — 1 source.
> Note: No source mentions specific techniques, such as how to judge convergence or how to check the order of convergence.

### S4.6 (SHOULD) Assess the effects of finite precision, and consider rewriting expressions that involve catastrophic cancellation
Assess the effects of finite precision (rounding, cancellation, underflow and overflow) on the accuracy of results. As an optional measure, consider whether expressions that subtract nearly equal values containing rounding error, or that overflow prematurely, can be rewritten into algebraically equivalent forms that avoid the problem (for example, rewriting x²−y² as (x−y)(x+y), or choosing between forms of the quadratic formula).
> Sources: **N7009H** §5.5.2.2 b · **GB91** § "Cancellation" — 2 sources.
> Note: If the inputs themselves are approximate values, such as measurements, a rewrite that merely turns catastrophic cancellation into benign cancellation is not worthwhile if it is costly [GB91]. There are also examples in which "simplification" by approximation actually worsens accuracy [GB91].

### S4.7 (SHOULD) Check that comparisons and loops do not misbehave when NaN occurs
Because ordering and equality comparisons with NaN are always false, check that termination conditions and branches do not lead to infinite loops or wrong branches when NaN occurs (for detecting NaN, infinities and other invalid conditions, for example by trapping exceptions or checking status flags, see S3.7).
> Sources: **N7009H** §5.4.2 [Rec. 4.2.2c] · **GB91** § "Special Quantities" > "Infinity" — 2 sources.
> Note: GB91 also emphasizes situations in which the default behavior of returning NaN or infinity on an exception and continuing the computation is useful [GB91]. Rather than stopping uniformly, distinguish places where the computation may continue from places where the result is invalidated.

## S5. Units, coordinate frames and physical constants

### S5.1 (SHOULD) Record the units and coordinate frames of quantities, inputs and outputs, and document conversions when they are mixed
For the quantities, input and output variables and parameters handled by the model and code, identify and record their units and (for vector quantities) coordinate frames. When units or coordinate frames are mixed, identify and document the necessary conversions, and check at design time whether conversions are needed at the interfaces between models. For computations that support critical decisions, recording units and coordinate frames is required (MUST).
> Sources: **N7009** 4.2.1.3 [M&S 46] [NASA scope] (must) · **N7009H** §5.2.1.3.4; §5.3.2 c–d [M&S 46] · **TW** reviewing-checklist § "Function/Method declarations" — 3 sources.

### S5.2 (SHOULD) Do not embed units in data values (single source)
In tabular data, do not include units in the values (3.4, not "3.4kg"); store them in a separate variable, such as the column name, or in metadata.
> Sources: **W17** 1d, §Data management — 1 source.

## S6. Random numbers

### S6.1 (SHOULD) Record and control the seed in analyses that use random numbers
In analyses that involve random numbers, record the seed used so that the results can be reproduced exactly; if the program chooses the seed internally (for example, from the time), write it to the output, and let users optionally supply it as an input parameter (such as a command-line argument) so that runs and tests can be made deterministic. If the seed cannot be fixed, or fixing it does not give identical results, record at least which analysis steps involve random numbers, and state the expected discrepancy on reproduction (the tolerance, S4.3) in the documentation and tests.
> Sources: **S13** Rule 6; Rule 6 (minimum) · **TW17** Rule 10 · **TW** overview-barriers § "Big data and complex computational infrastructure" — 3 sources.
> Note: In parallel computing it is difficult to obtain identical results from run to run even with a fixed seed, and some software (for example, TensorFlow) cannot fix random numbers without sacrificing parallelism [TW]. The sources agree and none disagrees, but none says must. See Appendix B.

## S7. Reproducibility and provenance

#### Recording how results were produced

### S7.1 (SHOULD) Record how every reported result was produced
For any result that may be used in a paper or report, record during the work how it was produced, including pre- and post-processing (the programs, inputs, and steps used). At minimum, keep enough detail that your future self can approximately reproduce the result (as a guide, S13 cites yourself one year later); for versions and parameters, see G4.15. Record the entire process automatically, in a format that other programs can read.
> Sources: **S13** Rule 1 · **W14** §Let the Computer Do the Work · **W17** 1e, §Data management · **N7009** 4.3.2e · **F4RS** FAIR4RS Principles, R1.2 · **TW** vcs § "Summary" — 6 sources.

### S7.3 (SHOULD) Have programs write their parameters, versions, and inputs to their output
At startup, have the program write all parameters and software versions to standard output or a log file along with the results. Include the version number in every output, including debugging traces. Where possible, log all inputs, including interactive selections, and check them against the intended inputs to detect typos and operator errors.
> Sources: **TW17** Rule 10 · **MS** automated-testing/README § "Build for Testing" · **N7009H** §5.6.2.2 · **N7009** App. E.3.3 — 4 sources.

### S7.4 (SHOULD) Record unavoidable manual steps in data processing
Where manual steps in data modification, conversion, or processing are unavoidable (script everything else, G7.2), record at minimum which files were changed or moved and for what purpose, and which menus or ranges were selected.
> Sources: **S13** Rule 2 · **W17** 1e, §Data management · **W14** Practice 2a, §Let the Computer Do the Work · **TW** code-reuse-overview § "Repeatable Recommendations" — 4 sources.
> Note: The sources agree and none dissent, but none states this as a must.

### S7.12 (SHOULD) Link statements in the text to the results that support them
For statements in papers and notes (interpretations, claims, conclusions), include at minimum enough detail (such as the file paths of detailed results) to trace them back to the underlying results in the future. Link them systematically from the time of writing.
> Sources: **S13** Rule 9 · **N7009** 4.3.9b — 2 sources.
> Note: The sources agree and none dissent, but none states this as a must.

### S7.13 (SHOULD) Record the rationale for the setup, and link result versions to the scenarios that produced them
For simulation and analysis setups, record the data and auxiliary software used to prepare the inputs, the rationale and assumptions of the setup, and key settings (time step, number of iterations, convergence tolerance, stopping criteria, etc.). Track each version of the run results together with the scenario (inputs and settings) that produced it, and place them under configuration management.
> Sources: **N7009** 4.3.1.4 [M&S 25] [NASA scope] (must) · **N7009H** §5.6.2.1 [M&S 24, 25; Rec. 4.3.2c, 4.3.2d] · **W17** 1a, §Data management — 3 sources.
> Note: W17 supports only the part on procedures for obtaining external data. Placing results under configuration management is in tension, as to where they are kept, with the statement that results that can be regenerated are not version-controlled [TW17].

#### Recreating the environment and the results

### S7.6 (MUST) Record the computational environment in a form others can recreate
Record the computational environment that produced the results (operating system, configuration of installed software and packages (with versions as in G4.15), compiler options, execution platform, and hardware characteristics such as the number of CPU cores) so that the environment in which the code ran can be recreated.
> Sources: **TW** code-reuse-overview § "Portable Recommendations"; renv § "Summary", § "What is a Computational Environment?", § "Motivation and Background" (must) · **N7009H** §5.6.2.1 [M&S 24, 25; Rec. 4.3.2c, 4.3.2d] · **RSQ** quality § "Aspects of Research Software Quality"; reproducible_software_environments § "What are reproducible software environments?" · **DLR** EAA.7, §Automation and Dependency Management [AC3+] — 4 sources.

### S7.7 (SHOULD) Capture and preserve the environment by means suited to the project
As needed, capture the computational environment with whichever of a package manager's version specification file, a virtual environment, a container, or a virtual machine suits the nature of the project (which one to use is optional); for declaring and preserving dependencies, see G4.12 and G4.17.
> Sources: **W17** 2g, §Software · **DLR** EAA.2, §Automation and Dependency Management [AC1+] · **TW** renv-options § "Capturing Computational Environments" · **RSQ** life_cycle § "Release & Deployment"; packaging_software § "Solutions", § "Container and Workflow Registries" · **S13** Rule 3 · **NL** best_practices, §Packaging · **N7009** 4.2.1.2 [M&S 45] [NASA scope] (must) · **N7009H** §4.6 b — 8 sources.

### S7.9 (SHOULD) Aim for the same results from the same version, inputs, and environment
Aim for a given released version, run with the same parameters, the same data, and the same computational environment, to return the same result every time (both correct output and errors). Identify and remove the causes of nondeterministic behavior. Accept that exact agreement may not be achieved during development.
> Sources: **TW17** Rule 4 · **RSQ** quality § "Aspects of Research Software Quality" · **N7009H** §5.2.1.2 d; §5.3.2 j–l · **DLR** EST.6, §Software Test [AC3+] · **S13** Rule 6 — 4 sources.
> Note: Exact reproduction across parallel computation or across different infrastructure configurations (operating systems, clouds, HPC facilities) is difficult [TW]. No source requires identical results across environments.

### S7.10 (SHOULD) Decide the level of reproducibility (at minimum yourself; third parties for results used in papers)
At minimum, make sure you yourself can reproduce your results. For results used in papers, grant applications, diagnoses, and the like, aim for a level at which others can rerun the entire analysis, from the data to the libraries.
> Sources: **S13** §Introduction · **TW17** Rule 10 · **TW** renv § "Science" (must) — 3 sources.
> Note: The statement that reproducibility by yourself is the minimum [S13] is a should; the must in TW concerns publishing and distributing the entire analysis to make it reproducible.

#### Saving and publishing results

### S7.11 (MUST) Save intermediate results and the data underlying figures
At minimum, save the intermediate files generated while running the analysis, unless they are prohibitively large. For each figure, save the underlying data (including values after plotting-time processing such as binning) and the code that created the figure so that they can be retrieved; at minimum, record which data the figure is based on and how it can be reconstructed. Where possible, use standardized formats (SHOULD).
> Sources: **S13** Rule 5 · **W17** §Data management · **N7009H** §5.6.4 · **TW** vcs § "Summary" (must) — 4 sources.

### S7.15 (SHOULD) At publication, bundle everything into a research compendium
When publishing a paper or similar work, bundle the data, code, computational environment specification, README, license, and citation metadata into a single research compendium and publish it together with the paper. To that end, organize the project's folders from the start on the assumption that the final product is a compendium, and describe in the README the steps to reproduce the paper's results.
> Sources: **TW** open-checklist § "Open Source Software"; compendia § "Basic Compendium" · **RSQ** life_cycle § "Publication" · **TW17** Rule 4 · **F4RS** Discussion, ZB MED — 3 sources.

### S7.16 (MUST) Publish the data and code that support the results
Publish the input data, scripts, versions, parameters, and intermediate results that support the results at the same time as the paper, and make them easily accessible (SHOULD). At minimum, submit the main data and source code as supplementary material, and be prepared to respond to inquiries about details of the data and methods (MUST). Do not rely on PDF alone for supplementary material: put results likely to be reused in text-format files (e.g., CSV, JSON, HDF5) and commands and code in source files or shell scripts; data subject to legal or ethical restrictions are excluded (G3.3).
> Sources: **S13** Rule 10 · **TW** vcs-checklist § "Make Sure That Your Data Is Version-Controlled"; code-reuse-overview § "Repeatable Recommendations"; compendia § "Summary", § "Motivation" · **W17** 1g, §Data management; 2j, §Software · **RSQ** life_cycle § "Research Software Lifecycle & Three-Tier Model"; three_tier_view § "Analysis code" · **TW17** Rule 4 — 5 sources.
> Note: Reproducibility does not necessarily require publication, and research that uses sensitive data can be made reproducible without publishing everything [TW]. Publication also does not imply an obligation on the authors to support extension or reuse of the data or code [TW].

## S8. Data management

#### Organizing and protecting data

### S8.1 (SHOULD) Keep raw data as obtained, and do not modify it
Store raw data in the form obtained from the instrument or survey, and do not overwrite it with cleaned versions. Treat raw data as the single canonical version, and prevent accidental changes or hand edits, for example by making it read-only.
> Sources: **W17** 1a, §Data management · **RSQ** software_project_structure § "Directory structure", § "Example project structures" · **TW** compendia § "Separating Methods, Data, Output" · **W14** Practice 4a — 4 sources.
> Note: The must in W14 concerns giving each element of data a single authoritative representation (DRY); no source states not modifying raw data itself as a must.

### S8.2 (SHOULD) Keep raw data, intermediate data, and results in separate locations
Divide data into raw, cleaned, intermediate, and processed stages, and keep them in separate subdirectories (e.g., `data/raw`, `data/processed`, `results`); for the general project layout, see G4.9.
> Sources: **RSQ** software_project_structure § "Directory structure", § "Example project structures" · **TW** compendia § "Structure of a Research Compendium", § "Basic Compendium" · **W17** 4c, §Project organization — 3 sources.

### S8.3 (SHOULD) Back up data to multiple locations
Back up raw data and material created by people (scripts, documents, packages depended on) to multiple locations as soon as they are created. If you use external disks, store them in a location separate from the original. Keep the project in a folder that is mirrored off the working machine (as a guide, W17 suggests syncing at least daily).
> Sources: **W17** 1b, §Data management · **TW** rdm § "Summary", § "Motivation and Background" · **RSQ** using_version_control § "How do you implement version control in your research workflow?" Solutions — 3 sources.
> Note: No source specifies the number of copies or the type of media. The sources agree and none dissent, but none states this as a must.

#### Describing and sharing data

### S8.4 (SHOULD) Record the origin and provenance of data
Give raw data a unique identifier and version number, and record its origin (e.g., in a README in the data folder). For data not stored locally, record the retrieval procedure, the official version number, and the download date. Make clear the quality and origin of input data (measured, estimated, assumed, or derived from another model).
> Sources: **W14** §Let the Computer Do the Work, 1 · **W17** 1a, §Data management · **RSQ** software_project_structure § "Directory structure", § "Example project structures" · **N7009** §3.2 Data Pedigree · **N7009H** §5.1.1.5 Note — 5 sources.
> Note: Grading data by quality, and the point that the credibility of inputs obtained from another model is bounded by that model's credibility, are guidance found only in N7009H.

### S8.5 (SHOULD) Store and exchange data in open standard formats
Convert data from closed proprietary formats to open standard formats readable by both machines and people (e.g., CSV for tables; JSON, YAML, or XML for nested structures; HDF5 or NetCDF for large structured data) for storage, and read and write it in line with the community standards of the field. For supplementary material, choose long-established formats over newer ones.
> Sources: **W17** 1c, File formats · **NL** best_practices, §Use standards · **TW** open-checklist § "Open Data" · **F4RS** FAIR4RS Principles, I1 · **RSQ** fair_rs § "How can we make our software interoperable?" · **S13** Rule 5 — 6 sources.

### S8.6 (SHOULD) Describe data with a README and metadata
Accompany data with a README and metadata stating what it is, how it was collected, its strengths and weaknesses, and its terms of use, following the metadata standards of the field.
> Sources: **TW** rdm § "Summary"; open-checklist § "Open Data"; rdm-fair § "Theory" · **W17** 1c, File names · **TW17** Rule 1 · **W14** Practice 3c, §Make Incremental Changes — 4 sources.

### S8.8 (SHOULD) Deposit published data in a repository that issues DOIs
Deposit published data in a trusted repository that issues persistent identifiers such as DOIs (e.g., Zenodo, Figshare, Dryad, domain-specific repositories) so that others can access and cite it; for code, see S11.7.
> Sources: **W17** 1g, §Data management · **TW** rdm-fair § "Theory"; open-checklist § "Open Data" · **RSQ** life_cycle § "Archiving", § "Research Software Lifecycle & Three-Tier Model" — 3 sources.

## S9. Analysis code and libraries

The evidence for this section is thin. Few sources discuss separating libraries from analyses.

### S9.2 (SHOULD) Make code used in multiple projects into a separate package
If you are building tools used in multiple projects, make the shared code a separate project and bundle its modules into a package.
> Sources: **W17** 4a, §Project organization · **TW** code-reuse-overview § "Re-runnable Recommendations" — 2 sources.
> Note: No source gives a criterion for how much to separate.

## S10. Reporting uncertainty and limitations

### S10.1 (SHOULD) Accompany results with an estimate of uncertainty and how it was obtained
When reporting results, include a quantitative estimate of uncertainty, a qualitative description of it, or an explicit statement that neither is available. Even for deterministic analyses, state what the result represents (e.g., minimum, most likely value, maximum). When giving uncertainty, explain the method used to obtain it (e.g., Monte Carlo, test data), how thoroughly its sources were identified, and why that method was chosen.
> Sources: **N7009** 4.3.8.2 [M&S 33] [NASA scope] (must) · **N7009H** §4.4 g — 2 sources.
> Note: The N7009 must applies only when the results of models that support critical decisions are reported to decision makers. This corpus provides no basis for requiring uncertainty reporting in research papers in general.

### S10.2 (SHOULD) Identify, classify, and record sources of uncertainty
Identify the sources of uncertainty (inputs and parameters, model construction, run settings, numerical error, output analysis), and record them qualitatively or quantitatively for the inputs, the results, and quantities derived from the results. Classify each source as aleatory or epistemic, and do not casually classify a source as aleatory (irreducible). Also record important physical processes, effects, and scenarios that were not considered.
> Sources: **N7009** §3.2 Aleatory / Epistemic Uncertainty, 13 · **N7009H** §4.5 — 2 sources.
> Note: Tracking uncertainty in a ledger (N7009H) is an example and is optional.

### S10.3 (SHOULD) Record the scope and results of sensitivity analysis
Use sensitivity analysis to identify the main drivers of the results, and record the ranges of the inputs varied and the results. Keep the ranges of variation within the permissible uses. Where possible, compare whether the model's sensitivities are consistent with those of the real system, and document the comparison.
> Sources: **N7009** 4.3.5 [M&S 30] [NASA scope] (must) · **N7009H** §5.6.2.3 [M&S 30] — 2 sources.

### S10.4 (SHOULD) Report runtime warnings and errors, and conditions that may invalidate results
Record the warnings, errors, and failure modes that occur during computation, and explain each one. When reporting results, present as explicit caveats any unmet acceptance criteria, violations of assumptions or limitations, unexplained warnings or errors, problems during setup or execution, and unresolved defects, and estimate their impact at least qualitatively. If there is no evidence that none of these apply, state that as well.
> Sources: **N7009** 4.3.1.6 [M&S 27] [NASA scope] (must) · **N7009H** §4.4 g — 2 sources.

### S10.5 (SHOULD) Use models within their permissible uses, and attach warnings to results obtained outside them
Each time you use a model or code, check the proposed use against its permissible uses (assumptions, parameter ranges, accuracy) and its domain of verification and validation (S2.2, S2.3). If you use it outside them, attach to the results a warning stating the type and degree of the limits exceeded and an assessment of the impact on the results (e.g., a flow calculation based on the perfect-gas assumption applied to high-temperature flow where real-gas effects appear).
> Sources: **N7009** 4.3.1.2 [M&S 23] [NASA scope] (must) · **N7009H** §5.6.1.2, Table 6 [M&S 22, 23] — 2 sources.

## S11. Publication and citation

#### Before publishing

### S11.2 (SHOULD) Before publishing, check intellectual property, institutional policy, and legal compliance
Before publishing software, check the ownership of intellectual property (third-party rights, employer ownership, grant conditions) and your institution's open source and intellectual property policies, and notify the legal office or other relevant contact. For export control, see G4.19. The specific contacts and procedures differ by organization.
> Sources: **RSQ** licensing_software § "Why should you assign a license to your research software?" Considerations · **OSG** legal / Which open source license is appropriate for my project? · **NL** best_practices, §Licensing · **DLR** ERM.10, §Release Management [AC1+] (must) — 4 sources.

### S11.13 (SHOULD) Before publishing, use a checklist to confirm that everything needed is in place
When publishing software, check the following items with a checklist.
- Release notes, changelog, and documentation (G9.9, G9.11, G8.1)
- Metadata for discovery, and records of dependencies and the environment (S11.10, G4.12, S7.6)
- Open license, citation file, contributing guide, and code of conduct (G4.2, G4.8, G10.35)
- Stable, versioned release (G9.1)
- Archive with a DOI (S11.7)
> Sources: **RSQ** publishing_software · **OSG** starting-a-project / Launching your own open source project · **NL** best_practices, §Checklists · **JOSS** SUB §Pre-review screening criteria, 3 [JOSS] (must) — 4 sources.
> Note: The weight of each item varies with the tier and purpose of the software [RSQ].

### S11.14 (SHOULD) For software you plan to publish, consider developing it in the open from an early stage
For software you plan to publish, rather than publishing it all at once after completion, consider moving to development in a public repository once you are comfortable with others seeing it. If you plan to submit to JOSS, move to open development early.
> Sources: **OSG** starting-a-project / Launching your own open source project · **RSQ** life_cycle § "Release & Deployment" · **JOSS** RC §Open development — 3 sources.
> Note: OSG says that going public is fine at the idea stage, partway through the work, or after years of being closed, and leaves the timing to the author's judgment.

### S11.20 (SHOULD) If you publish a paper about the software itself, have minimum robustness and openness practices in place
If you publish a paper about the software itself, have the following in place so that others can install it and verify its core functionality. For new software, have colleagues try it out.
- Versioned release (G9.1)
- README, installation instructions, and usage examples (G8.1)
- Explicit dependencies and automated installation (G4.12, G4.13)
- Automated tests, or documented verification procedures (G6.22, G8.10)
- Contributing guide and a point of contact for support (G4.8, G10.30)
> Sources: **TW17** §Introduction · **JOSS** RC §Good practices — 2 sources.
> Note: TW17 cautions that not all scientific software needs to be robust.

#### Citation and metadata

### S11.4 (SHOULD) In papers, cite the software used at its specific version
When referring to software in a paper, whether your own or someone else's, cite the specific release used to obtain the results, with its name, authors, and a stable reference such as a DOI. Citing software is also a way to credit developers who are not coauthors of the paper. The sources do not go so far as to require citing every dependency in the paper.
> Sources: **RSQ** life_cycle § "Publication"; citing_software § "Why does software citation matter?" · **NL** best_practices, §Releases · **TW** code-reuse-overview § "Repeatable Recommendations" — 3 sources.

### S11.6 (MUST) If you provide CITATION.cff, make it conform to the specification
Name the file exactly CITATION.cff, including case; include the required keys cff-version, message, title, and authors; and make it a valid YAML 1.2 file that conforms to CFF schema 1.2.0. Include authors, title, and type in each reference under references or preferred-citation. Check it with a validation tool (e.g., cffconvert) (SHOULD).
> Sources: **CFF** SG §General structure of a CITATION.cff file (must) · **RSQ** citing_software § "What is software citation?", § "Solution", § "Why do you need a CITATION.cff file?", § "What is the Citation File Format?" Solutions — 2 sources.

### S11.10 (SHOULD) Record references to the software and data you build on in machine-readable metadata
When you build on other people's software or data, record references to it in a metadata file in an interoperable standard (e.g., references in CITATION.cff, softwareRequirements in codemeta.json), to credit its creators and to record the versions and dependencies needed for reproduction.
> Sources: **RSQ** life_cycle § "Publication"; software_metadata § "Solutions"; fair_rs § "How can we make our software findable?" · **F4RS** FAIR4RS Principles, F2 · **TW** open § "Summary" · **JOSS** SUB §Submission Process · **CFF** SG §Referencing other work — 5 sources.
> Note: No source specifies whether to use CodeMeta or CFF. JOSS treats metadata files as optional [JOSS].

### S11.19 (SHOULD) List contributors as authors in the citation file
Identify the individuals who contributed to the software in the authors of CITATION.cff; if individual names are not known, use the name of the group.
> Sources: **CFF** SG §How to deal with unknown individual authors? · **RSQ** life_cycle § "Publication"; citing_software § "Why does software citation matter?" · **TW17** Rule 2, README item 6 · **JOSS** SUB §Review Process · **NL** CONTRIBUTING, §Technical — 5 sources.
> Note: JOSS gives only criteria for coauthorship of the paper. See Appendix B.

#### Hosting, archiving and FAIR

### S11.7 (SHOULD) Deposit the version a paper refers to with a DOI, and give each version an identifier
When submitting a paper, deposit the code, like the data, in a trusted repository that issues DOIs (e.g., Zenodo, Figshare), and refer to it from the paper by that DOI. So that the versions subject to citation and reproduction can be distinguished, give each released version its own persistent identifier (e.g., DOI, SWHID), and list it separately from the identifier that covers all versions (concept DOI).
> Sources: **W17** 2j, §Software · **RSQ** life_cycle § "Archiving", § "Research Software Lifecycle & Three-Tier Model" · **JOSS** SUB §Review Process [JOSS] (must) · **F4RS** FAIR4RS Principles, F1 · **TW** compendia § "Publishing a Compendium" · **CFF** SG §Valid keys, doi / identifiers; §definitions.doi — 4 sources.
> Note: W17 asks for a single deposit at paper submission, and JOSS asks for a DOI for the accepted version. Only RSQ and F4RS (aspirational) call for an identifier per version.

### S11.8 (SHOULD) Archive releases in long-term preservation services so they remain available after development ends
Archive released software in services intended for long-term preservation (e.g., Software Heritage, Zenodo), and also archive the main deliverables at phase boundaries and at the end of the life cycle. GitHub and GitLab are not designed to guarantee long-term preservation, so do not rely on them alone. After development ends, keep the code, including past versions, and its metadata available through standard protocols, and keep the metadata accessible even if the software itself is no longer available.
> Sources: **RSQ** life_cycle § "Archiving", § "Research Software Lifecycle & Three-Tier Model" · **N7009H** §4.6 b · **DLR** ERM.11, §Release Management [AC3+] · **F4RS** FAIR4RS Principles, A1 · **TW17** Rule 4 · **TW** code-reuse § "Reusable Code"; open-checklist § "Open Source Software"; rdm-fair § "Theory" · **NL** CONTRIBUTING, §Create a PDF file — 6 sources.
> Note: The sources disagree on where to preserve releases. RSQ names Software Heritage and Zenodo, while N7009H names the organization's management of work products.

### S11.9 (SHOULD) Host code in a public repository likely to last, and register it in a registry where possible
Host published code in a freely accessible public repository that is likely to last a long time (e.g., GitHub, GitLab, language-specific package repositories). Ideally, also register it in a general-purpose or domain-specific software registry (e.g., bio.tools, Research Software Directory).
> Sources: **RSQ** fair_rs § "How can we make our software findable?"; using_version_control § "How do you implement version control in your research workflow?" Solutions · **TW** code-reuse § "Reusable Code"; open-checklist § "Open Source Software"; rdm-fair § "Theory" · **JOSS** RC §Where can the repository be hosted? [JOSS] (must) · **F4RS** FAIR research software examples, Comet — 3 sources.

### S11.11 (SHOULD) Refer to the FAIR4RS principles as aspirational goals, and work on them from development onward
Refer to the FAIR4RS principles as aspirational goals when publishing and preserving research software, and apply them while distinguishing whether each principle targets the software itself (F1, F1.1, F1.2, A1, I, R) or its metadata (F3, F4, A2). Treat meeting individual principles as optional, and use assessment tools as described in G1.8. Do not leave making software FAIR and preparing metadata and citation metadata until publication; start early in development and finish no later than the preparation for publication.
> Sources: **F4RS** FAIR4RS Principles, F · **TW** code-reuse § "Reusable Code"; open-checklist § "Open Source Software"; rdm-fair § "Theory" · **RSQ** quality § "FAIR Research Software"; fair_rs § "Tools and practices for FAIR" · **NL** best_practices, §Checklists — 4 sources.
> Note: Making software FAIR does not replace quality assurance; correctness and operation on multiple platforms must be ensured by testing and other means [RSQ]. Community practices for identifiers and metadata vocabularies are not yet standardized, and the principles themselves are scheduled for revision [F4RS].

### S11.12 (SHOULD) Handle access-restricted material within the FAIR framework
Handle software and data that require access restrictions within the FAIR framework as well, through retrieval procedures with authentication and authorization and through publication of their metadata.
> Sources: **F4RS** FAIR4RS Principles, A1.2 · **TW** rdm-fair § "Theory" — 2 sources.

---

## References

All sources were retrieved on 2026-10-19. Web sources change; when revising this document, retrieve them again. For Git-hosted sources the commit used is given.

### Scientific software practice

- **W14** — Wilson G, et al. "Best Practices for Scientific Computing." *PLOS Biology* 12(1): e1001745 (2014). https://doi.org/10.1371/journal.pbio.1001745
- **W17** — Wilson G, et al. "Good Enough Practices in Scientific Computing." *PLOS Computational Biology* 13(6): e1005510 (2017). https://doi.org/10.1371/journal.pcbi.1005510 — a revision of W14 for beginners; shared authors.
- **S13** — Sandve GK, et al. "Ten Simple Rules for Reproducible Computational Research." *PLOS Computational Biology* 9(10): e1003285 (2013). https://doi.org/10.1371/journal.pcbi.1003285
- **TW17** — Taschuk M, Wilson G. "Ten simple rules for making research software more robust." *PLOS Computational Biology* 13(4): e1005412 (2017). https://doi.org/10.1371/journal.pcbi.1005412
- **TW** — The Turing Way Community. *The Turing Way.* 27 chapters under reproducible-research (overview, vcs, testing, code-reuse, licensing, rdm, renv, reviewing, open, make, compendia). Commit c25d0befe9ce3a21ac46fa47b685db82ad169909 (2026-10-16). https://github.com/the-turing-way/the-turing-way
- **F4RS** — Barker M, et al. "Introducing the FAIR Principles for research software." *Scientific Data* 9: 622 (2022). https://doi.org/10.1038/s41597-022-01710-x
- **BSSw** — Bartlett R, et al. "Definition and Categorization of Tests for CSE Software." Better Scientific Software (2018). https://bssw.io/blog_posts/definition-and-categorization-of-tests-for-cse-software
- **RSQ** — EVERSE. *Research Software Quality Kit (RSQKit).* 25 pages. Commit cf49a090ce145e16130ad1985be641f38be0af72 (2026-10-09). https://everse.software/RSQKit/
- **JOSS** — Journal of Open Source Software. *Review criteria* and *Submitting a paper.* https://joss.readthedocs.io/

### Verification, validation and numerical computation

- **N7009** — NASA. *Standard for Models and Simulations.* NASA-STD-7009B (2024-03-05). https://standards.nasa.gov/standard/NASA/NASA-STD-7009
- **N7009H** — NASA. *NASA Handbook for Models and Simulations: An Implementation Guide for NASA-STD-7009B.* NASA-HDBK-7009B (2026-02-03). https://standards.nasa.gov/standard/NASA/NASA-HDBK-7009 — the implementation guide for N7009; treated as the same family. Page headers in the retrieved file still read DRAFT.
- **GB91** — Goldberg D. "What Every Computer Scientist Should Know About Floating-Point Arithmetic." *ACM Computing Surveys* 23(1) (1991). Reprint in Oracle's *Numerical Computation Guide*, Appendix D, used. https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html — the reprint includes an addendum by Sun, "Differences Among IEEE 754 Implementations", which this document cites separately from Goldberg's own text.

### Institutional software engineering guidelines

- **DLR** — DLR (German Aerospace Center). *Software Engineering Guidelines.* English text and application-class checklists v1.0. https://rse.dlr.de/guidelines/00_dlr-se-guidelines_en.html
- **NL** — Netherlands eScience Center. *Guide.* Nine files excluding language guides. Commit 977965e18d983b363e88c9f2025250124032434a. https://github.com/NLeSC/guide

### General software development

- **GEP** — Google. *Engineering Practices Documentation* (Code Review Developer Guide: all reviewer and developer pages). Commit 3bb3ec2. https://github.com/google/eng-practices
- **MS** — Microsoft. *Engineering Fundamentals Playbook.* 17 pages (fundamentals checklist, source control, automated testing, CI, code reviews, security, documentation, observability). Commit 016770e. https://github.com/microsoft/code-with-engineering-playbook
- **CP** — SciML. *ColPrac: Contributor's Guide on Collaborative Practices for Community Packages.* Commit 48746d9. https://github.com/SciML/ColPrac
- **SEMVER** — *Semantic Versioning 2.0.0.* Commit f99d548. https://semver.org/
- **KC** — *Keep a Changelog 1.1.0.* https://keepachangelog.com/en/1.1.0/
- **CCOM** — *Conventional Commits 1.0.0.* https://www.conventionalcommits.org/en/v1.0.0/
- **DX** — Procida D. *Diátaxis.* start-here, tutorials, how-to-guides, reference, explanation, compass. Commit 957c09c. https://diataxis.fr/
- **CFF** — *Citation File Format.* README and schema guide. Commit dd51afe. https://citation-file-format.github.io/
- **OSG** — GitHub. *Open Source Guides.* legal, code-of-conduct, starting-a-project, best-practices. Commit e7ac98e. https://opensource.guide/
- **COC** — *Contributor Covenant 2.1.* https://www.contributor-covenant.org/version/2/1/code_of_conduct/

### AI coding agents (vendor documents; revised often)

- **CC** — Anthropic. *Claude Code: Best practices.* https://code.claude.com/docs/en/best-practices
- **CX** — OpenAI. *Codex: Best practices.* https://developers.openai.com/codex/learn/best-practices (redirected to learn.chatgpt.com at retrieval)

### Excluded

| Source | Reason |
|---|---|
| ISO/IEC/IEEE 12207 | Paid standard; the text could not be retained. |
| IEEE CS SWEBOK Guide v4 | Requires registration; not retrieved. |
| Oberkampf & Roy, *Verification and Validation in Scientific Computing* (2010) | A book; the text could not be retained. V&V concepts are taken from N7009 and BSSw instead. |
| obra/Superpowers | A personal prompt collection; judged unsuitable as a normative source for a public guideline. |

---

# Appendices

## Appendix A. Adopting practices in stages

Each source draws its stages differently, and the stages have not been mapped onto one another. The table below lists each source's stages as they are, without mapping them.

### A.1 Stages by source

| Source | Stages | Criteria |
|---|---|---|
| DLR | Application classes 0–3 (cumulative) | AC0: personal use, not used by colleagues; no recommendations: DLR (Application Class 0; Definition of the intended Application Class). AC1: software distributed to third parties outside the institute must be at least AC1: DLR (Definition of the intended Application Class, "Distribution of the software"; must). AC2: if the functional scope is large and development continues after the knowledge holders leave (roughly more than 2 years), the software must be AC2: DLR (Definition of the intended Application Class, "Period of further development"; must). AC3: high impact of failure: DLR (Definition of the intended Application Class, "Risks for the facility"). "Small" means at most 1 person-year of total effort, and lines of code are not used as a criterion: DLR (Definition of the intended Application Class, "Scope"). |
| W17 | Beginners and small projects (one person or a few, days to months) | Deliberately leaves unit tests, coverage, CI, build tools, branches, comprehensive documentation, code review, and pair programming out of its recommendations: W17 (What we left out, pp. 17–19). |
| W14 | Researchers already doing a substantial amount of computing | Recommends some of the practices W17 left out, such as unit tests, build tools, and code review: W14 (Practices 5b, 2c, 8a). But do not adopt them all at once: W14 (Conclusion). |
| TW17 | Software that is the subject of a paper | The 10 rules apply "at least" to software that is the subject of a paper: TW17 (Introduction). One-off analysis code is excluded: TW17 (Conclusion). Triggers for considering hardening: the code is used three or four times for slightly different purposes, becomes important to the lab, or is handed to others: TW17 (Conclusion). |
| RSQKit | Three tiers (analysis code / prototype / research software infrastructure) | Higher tiers call for more quality indicators: RSQ (life_cycle, Three-Tier Model; three_tier_view, History and context). Throwaway scripts do not even need static analysis: RSQ (static_analysis). Do not wait until the software is widely used to establish good habits: RSQ (software_maintenance). There is no consensus on a table mapping indicators to tiers: RSQ (three_tier_view, quality guidance for each tier; contested). |
| NASA-STD-7009 | Criticality (consequence of the decision × influence of the results on the decision) | The standard applies to models and simulations that support critical decisions: N7009 (§4.1.1.2); N7009H (§5.1.1.4). |

Sandve et al.'s 10 rules attach an "as a minimum" fallback to almost every rule (S13); the main text gives the full form and the minimum form side by side (see S7).

## Appendix B. Commonly held beliefs without support in the sources

These are practices that are widely followed or believed but that the sources in this corpus do not support, or support only in part. Each item gives the commonly held belief and only what the sources actually say.

### Version control and configuration

- **Commit the lock file (commit it for analyses, not for libraries).** No source mentions "lock file" or treats analyses and libraries differently; the sources support only recording exact versions (RSQ (software_maintenance), S13 (Rule 3), DLR (EAA.6)), and RSQ (reproducible environments) says that in many cases specific versions need not matter.
- **Use Git LFS for large files / keep data over 1 MB out of Git.** W17 judged LFS (as of 2017) not mature enough to recommend, MS gives it as one example, and RSQ (using_version_control) says only that it "may be considered". The only numeric figure is GitHub's 100 MB per-file limit cited by W17; RSQ (software_project_structure) gives no threshold.
- **Use Conventional Commits and generate the changelog from commits.** Only MS recommends this, as an example for deriving versions from commits (semantic-release versioning is may); CCOM, as a specification, only states its own benefits, and KC rejects commit-log diffs as changelogs.
- **Always squash merge / keep a linear history.** MS recommends squashing, but MS also asks the team to choose between linear and nonlinear history, and CP discourages squashing during review.
- **Avoid GPL; use MIT.** W17 (3d) recommends permissive licenses, but OSG recommends GPLv3/AGPLv3 depending on the goal, and RSQ is neutral.
- **Put a CODE_OF_CONDUCT in every repository.** Only OSG says "every project"; RSQ limits it to projects with multiple contributors.

### Design, testing, and review

- **Avoid global variables; build on pure functions and push I/O, randomness, and time to the edges.** No source uses "global", "pure", or "side effect" for such a recommendation (in W14 and W17, "side effect" means a by-product of modularization); the closest is W17 (2b), that functions should not refer to outside information (should).
- **Rewrite legacy code.** No source supports this; RSQ (technical debt) calls large rewrites risky and recommends incremental improvement, and RSQ (static_analysis) introduces quality tools to existing code gradually, using a baseline.
- **Put unit tests, CI, coverage, and code review into all research code from the start.** W17 deliberately leaves these out for beginners and small projects, TW17 excludes one-off analysis code, DLR has no recommendations at AC0, and RSQ requires CI at tier 3. At the higher levels, every source supports these practices.
- **The test suite must finish within N minutes.** No source sets a time limit; the support is for fast unit tests (BSSw, RSQ (testing_software)), timeouts on long verifications (MS (end-to-end tests)), and running slow tests nightly (TW (testing guidance), BSSw).
- **One assertion per test.** No source limits the number; RSQ's "verify one condition per test" and GEP (Tests) are not rules about counts.
- **Aim for 80% (or 100%) coverage.** The 80% figure is a parenthetical example in MS (code coverage checks), and the MS checklist says ">90% if possible" with no modal verb; RSQ warns against fixating on 100%, and W17 (What we left out, Coverage) does not recommend that beginners measure coverage at all.
- **TDD is mandatory.** No source makes it an obligation; MS and RSQ mention it only at the may level.
- **PRs under N lines (e.g., 400), always two approvers.** No source sets a strict limit; GEP (small CLs) gives 100 and 1000 lines as rough figures and leaves the call to the reviewer, and MS says to use common sense. Approver counts differ: one approval in CP, usually two in MS, one or two in DLR (EDI.11).

### Verification and numerical computing

- **Comparing floating-point values with a tolerance is enough.** GB91 (Systems Aspects) says tolerance comparison is not a cure-all, pointing to the choice of tolerance, values of opposite sign, and the loss of transitivity. CP, TW17 (Rule 10), and N7009H (Table 7) assume tolerances, but no source covers choosing relative versus absolute error, ulp-based comparison, or deriving tolerances from condition numbers or discretization error.
- **Numerical results must match bit for bit, and regression tests should compare bitwise.** No source requires bitwise agreement across platforms or code changes; BSSw warns that binary-identity tests can hinder refactoring, CP does not treat changes in specific floating-point values as breaking, and GB91 (Sun addendum) shows that IEEE does not guarantee identical results. The support is for identical results with the same version and environment (TW17 (Rules 4, 10), S13 (Rule 6), RSQ).
- **Verify with the method of manufactured solutions, Richardson extrapolation, order-of-accuracy checks, and conservation tests.** None of these terms appears in the originals, and N7009H (§4.7) states that it prescribes no specific V&V techniques; the closest, N7009H (§5.5.2.2 b), describes checking convergence to the asymptotic limit but gives no extrapolation or order formulas.
- **Pass random seeds as function arguments.** Passing them as CLI input parameters is supported (TW17 (Rules 3, 10)), but no source has a design rule for passing random number generators or seeds into functions or classes.
- **Use independent random streams in parallel computations.** No source supports this; TW (background) only notes the difficulty of getting identical results in parallel computing, with no recommendation on splitting streams or deriving seeds.
- **Record the source of physical constants (e.g., the CODATA version) and carry units in types (dimensional-analysis libraries).** "CODATA" appears zero times, and W14 (Practice 4a) only recommends defining constants once. For units, the sources ask only for recording and documentation (N7009 (4.2.1.3), N7009H (§5.2.1.3.4; §5.3.2), TW) and for separating units from values in data files (W17 (1d)); the means of implementation is not specified.

### Reproducibility, data, and publication

- **3-2-1 backups (three copies, two media, one off-site).** No source specifies the number of copies or media types; the sources call for backups to multiple locations (W17 (1b), TW), off-site storage when using external disks (W17 (1b)), syncing at least daily (W17 (5e)), and regular backups (RSQ).
- **Notebooks cannot be a unit of reproducibility.** The sources point the other way: RSQ treats notebooks as one packaging option and as one component of a research compendium. JOSS's exclusion of notebooks defines the journal's scope.
- **Monte Carlo results must always carry statistical errors.** No source says this in this form; N7009 (4.3.8.2; must, reporting to decision makers) requires uncertainty estimates but accepts a qualitative description or an explicit statement that no estimate exists, and N7009H (§5.6.1.3.4) only says to apply statistical analysis.
- **The CITATION.cff format is mandatory, and version and date-released are updated with every release.** No source mandates the CFF format; in CFF these keys are optional and no update timing is given (CFF (Valid keys)), and RSQ only describes cffinit as a tool for updating an existing file.
- **Document the authorship criteria for the software (who is listed as an author).** No source supports this; CFF and RSQ ask for authors to be listed but give no criteria, JOSS's criteria cover co-authorship of JOSS papers, and F4RS and OSG have no authorship criteria.
- **Cite dependencies in papers.** No source says this in this form; RSQ calls acknowledging software use by citation good practice but does not ask for completeness, CFF (Referencing other work) concerns references in metadata, and JOSS concerns citing prior similar work.

### Principles and operations

- **There is an overall ranking of values (e.g., correctness > reproducibility > readability > performance).** No source has one; the only explicit contrasts are optimize after it works (W14, W17), write for people, not computers (W14), and technical facts override opinions (GEP), and N7009 scales rigor to the importance of the decision.
- **Fix detailed requirements before starting, and adopt a specific process (e.g., Scrum).** W14 says requirements for scientific software are not fixed, so methods that depend on upfront specification do not fit, and the documents DLR and N7009 require are brief and can be revised later. The research-oriented sources require no specific process, and N7009H only says that it does not exclude agile methods.
- **Following the procedure guarantees quality.** N7009H states that compliance with the standard does not correlate with the level of credibility achieved, and RSQ says metrics do not fully capture quality, which depends on context.

## Appendix C. How this document was made

1. **Collection.** The 26 sources in References were retrieved on 2026-10-19 and stored with URL, size, SHA-256, and commit hash.
2. **Extraction.** For each source, every recommendation and every explicit "do not" was tabulated with the source's own strength (must / should / may / example / background), its location, and a short identifying phrase: 1,789 rows. "Mentions" were distinguished from "recommends".
3. **Synthesis.** The rows were classified into 25 topics and consolidated across sources into 415 draft clauses, each with its supporting rows, number of independent sources, scope conditions, and conflicts between sources.
4. **Drafting and audit.** The draft clauses were written as the 343 clauses of the full edition, then checked by auditors separate from the drafters, who downgraded clauses whose only *must* was out of scope, removed wrong citations, and corrected source counts. This edition keeps the better-supported clauses and replaces row identifiers with source keys and locators.

Extraction, synthesis, translation, and audit were carried out by AI agents (Claude Opus) under a human editor who designed the procedure and made the final checks. Extraction by AI can still err; when a clause looks doubtful, follow the Sources line to the original.

---

*Published by [JuliaPackageFactory](https://github.com/JuliaPackageFactory). Text licensed under CC BY 4.0. Issues and pull requests are welcome; a proposed clause should name the source and the passage that supports it.*
