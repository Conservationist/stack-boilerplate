# 🚀🔥 Stack Boilerplate 🔥🚀

Some boilerplate code that I find myself writing a lot, and some tools to go with it!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Knowledge of:

- [nodejs](https://nodejs.org/en/)
- [expressjs](https://expressjs.com/)
- [typeorm](https://github.com/typeorm/typeorm)
- [typescript](https://www.typescriptlang.org/)
- [react](https://reactjs.org/)

### Installing API

A step by step series of examples that tell you how to get a development env running

```
cd api
```

```
npm i || yarn install
```

Create a file called ormconfig.json in /api/

```
{
  "type": "WHICH EVER DB EX. POSTGRES OR MYSQL",
  "host": "DB HOST",
  "port": 5432,
  "username": "example",
  "password": "example",
  "database": "dbname",
  "synchronize": true,
  "logging": false,
  "entities": ["src/entity/**/*.ts"],
}
```

```
npm run start || yarn start
```

### Happy hunting ;)
