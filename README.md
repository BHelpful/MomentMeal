# BHelpful MonoRepo

*Description of repo*

## Helpful information

### Information and HOW_TOs
If you need information about the repo or how to guides go to the folder `DOCS/`.

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