import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { Express } from 'express';

export default async function routeImport(
  directory: string,
  application: Express,
  port: number
) {
  const log = console.log;
  const startTime = new Date();
  const rootDir = path.join(__dirname, '../');
  const Routes = fs.readdir(path.join(rootDir, directory), (err, files) => {
    if (err) {
      console.error(chalk.bgRedBright(err.name));
    }
    files.forEach(async file => {
      const fullName = path.join(directory, file);
      if (!file.toLowerCase().indexOf('ts')) {
        return;
      } else {
        const routeName = file.split('.')[0].toLowerCase();
        const module = await import('../' + fullName);
        application.use('/' + routeName, module.default);
        const endTime = new Date();
        const time = (endTime.getTime() - startTime.getTime()) / 1000;
        log(
          `Imported ${chalk.redBright(fullName)} in ${chalk.yellow(
            `${time}`
          )} seconds.`
        );
        module.default.stack.map((layer: any) => {
          if (layer.route) {
            const { path, methods } = layer.route;
            log(
              `   Mapped ${chalk.redBright(
                Object.keys(methods)[0].toUpperCase()
              )} route ${chalk.redBright(
                `localhost:${port}/${routeName}${path}`
              )}`
            );
          }
        });
      }
    });
  });
  return Routes;
}
