import * as express from 'express';
import { NextHandleFunction } from 'connect';

interface IOptions {
  route?: string;
}

/**
 * Checks incoming post req payloads for email and password.
 * @param options - pass object with options
 * Example:
 *
 *     app.use(checkCredentials({route: '/user/login'}))
 */
export default function(options?: IOptions) {
  let opts: IOptions = {};

  if (options) {
    for (const key in options) {
      opts[key as keyof IOptions] = options[key as keyof IOptions];
    }
  }

  return function(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): NextHandleFunction | void {
    if (!opts.route) {
      if (req.method === 'POST') {
        const { email, password } = req.body;
        if (!email || !password) {
          res.status(404).send({ success: false });
          return;
        } else if (email.length < 3 || password.length < 3) {
          res.status(422).send({ success: false });
          return;
        }
      }
    } else if (opts.route === req.originalUrl) {
      if (req.method === 'POST') {
        const { email, password } = req.body;
        if (!email || !password) {
          res.status(404).send({ success: false });
          return;
        } else if (email.length < 3 || password.length < 3) {
          res.status(422).send({ success: false });
          return;
        }
      }
    }
    next();
  };
}
