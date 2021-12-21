[![CodeQL](https://github.com/BHelpful/BHelpful/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/BHelpful/BHelpful/actions/workflows/codeql-analysis.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=BHelpful_BHelpful&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=BHelpful_BHelpful)
[![CodeScene Code Health](https://codescene.io/projects/21818/status-badges/code-health)](https://codescene.io/projects/21818)
[![CodeScene System Mastery](https://codescene.io/projects/21818/status-badges/system-mastery)](https://codescene.io/projects/21818)


# BHelpful MonoRepo

*Description of repo*

## Helpful information

### Information and HOW_TOs
If you need information about the repo or how to guides go to the folder `DOCS/`.

### Repo health information

#### Sonarcloud

Here is the current overview of the code health of the repository measured by Sonarcloud.

- https://sonarcloud.io/summary/overall?id=BHelpful_BHelpful

#### CodeScene
Here is the current overview of the code health of the repository measured by CodeScene.


- https://codescene.io/projects/21818/jobs/328456/results

### Overview of the repo structure
...

### Environment variables
For this repo we use environment variables stored in a `.env` file. The structure of this file is as follows:
```
PORT = "<SOME_PORT_1>"

HOST = "localhost"

DB_URI = "<URI_FOR_YOUR_LOCAL_MONGO_DB_SERVER>"

NX_MP_API_URI = "http://localhost:<SOME_PORT_1>"

SALT_WORKER_FACTOR = <SOME_INTEGER>

ACCESS_TOKEN_TTL = "15m"

REFRESH_TOKEN_TTL = "1y"

PRIVATE_KEY = "<YOUR_RSA_PRIVATE_KEY>"

NX_CLOUD_AUTH_TOKEN = "<YOUR_GENERATED_NX_CLOUD_AUTH_TOKEN>"
```