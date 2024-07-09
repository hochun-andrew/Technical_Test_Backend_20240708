# Technical Test Backend

* [Quick Start](#quick-start)
* [Running Tests](#running-tests)

## Quick Start

  Install dependencies:

```console
$ npm install
```

  Create a PostgreSQL database table using [sql/create_table.sql](https://github.com/hochun-andrew/Technical_Test_Backend_20240708/blob/main/sql/create_table.sql)

  Create a `.env` file in the root of your project

```dosini
PGUSER="<your_db_user>"
PGPASSWORD="<your_db_password>"
PGHOST="<your_db_host>"
PGPORT=<your_db_port>
PGDATABASE="<your_db_name>"
PORT=<your_backend_port>
```

  Start the server:

```console
$ npm run dev 
```

### Running Tests

  Run the tests using Jest:

```console
$ npm run test
```
