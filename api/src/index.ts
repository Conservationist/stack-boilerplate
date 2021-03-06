import * as express from 'express';
import routeImport from './lib/routeImport';
import { createConnection } from 'typeorm';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';

const startserver = async () => {
  await createConnection()
    .then(() => console.log('🔥 Connected to DB. 🔥'))
    .catch(e => {
      throw Error(e);
    });
  const port = 4000;
  const app = express();
  app.use(bodyParser.json());

  /* express session */
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: 'ENTER SECRET HERE',
    })
  );

  /* if no session is found, return an error */
  app.use(function(req, _, next) {
    if (!req.session) {
      return next(new Error('oh no'));
    }
    next();
  });

  /* import all routes from the ./routes folder */
  routeImport('routes', app, port);

  app.get('/', (_, res) => {
    res.send("🚀 You've been blasted. 🚀");
  });
  app.listen({ port }, () => {
    console.log('🚀 🔥 Server started on port 4000. 🚀 🔥');
  });
};
startserver();
