[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=BHelpful_BHelpful&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=BHelpful_BHelpful)
[![CodeQL](https://github.com/BHelpful/BHelpful/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/BHelpful/BHelpful/actions/workflows/codeql-analysis.yml)
[![CodeScene Code Health](https://codescene.io/projects/27963/status-badges/code-health)](https://codescene.io/projects/27963)
[![CodeScene System Mastery](https://codescene.io/projects/27963/status-badges/system-mastery)](https://codescene.io/projects/27963)

# BHelpful MonoRepo

This repository contains all applications of BHelpful that benefits from sharing libraries and developer enviorment.

### Information and HOW_TOs

If you need information about the repo, our design patterns or how-to guides, go to the folder [`DOCS/`](https://github.com/BHelpful/BHelpful/tree/master/DOCS/).

The most important documents are:

- [`DESIGN_PATTERNS.md`](https://github.com/BHelpful/MealTime/blob/master/DOCS/DESIGN_PATTERNS.md) - Contains all the design patterns used in the project (READ THROUGH before developing).
- [`CONTRIBUTING.md`](https://github.com/BHelpful/MealTime/blob/master/DOCS/CONTRIBUTING.md) - Contains all the information about how to contribute to the project.
- [`CODE_OF_CONDUCT.md`](https://github.com/BHelpful/MealTime/blob/master/DOCS/CODE_OF_CONDUCT.md) - Contains all the sets of rules outlining the norms, rules, and responsibilitie/proper practices of MealTime.


### Repo health information

Here is the current overview of the code health of the repository measured by:

- Sonarcloud: https://sonarcloud.io/summary/overall?id=BHelpful_BHelpful
- CodeScene: https://codescene.io/projects/27963/jobs/530796/results

### Overview of the repo structure

- **DOCS**: Useful information, readmes and guides.
  - **HOW_TOs**: Guides/requirements to setup applications
- **apps**: Contains each application under this monorepo
- **tools**: Contains generators and other tools to easily setup a developer environment
