import * as fs from 'fs';
import * as path from 'path';
import * as inquirer from 'inquirer';
import chalk from 'chalk';

const log = console.log;
const jsFile = `import * as express from 'express';
const router = express.Router();

/* custom middleware */
router.use(function(req, res, next) {
  next();
});

/* define the base route */
router.get('/', function(req, res) {
  res.send('👀 anyone here? 👀');
});

/* define more routes! */
export default router;
`;

const createFile = async (filename: string, extension: string) => {
  const fullFileName = `${filename}.${extension}`;
  const filepath = path.join(__dirname, `../routes/${fullFileName}`);
  const Routes = fs.readdirSync(path.join(__dirname, '../routes'));
  if (Routes.includes(fullFileName) === true) {
    console.error(chalk.bgRedBright('File with that filename already exists!'));
    askQuestions();
  }
  fs.writeFile(filepath, jsFile, err => {
    if (err) {
      throw err;
    }

    log(chalk.greenBright('Route successfully generated!'));
  });
};

const askQuestions = () => {
  const questions = [
    {
      name: 'FILENAME',
      type: 'input',
      message: 'Name of route you want to generate?',
      validate: (val: string): any => {
        if (val.length < 1) {
          return console.error(chalk.bgRedBright('No filename specified!'));
        }
        return true;
      },
    },
    {
      type: 'list',
      name: 'EXTENSION',
      message: 'What file extension?',
      choices: ['.ts'],
      filter: function(val: any) {
        return val.split('.')[1];
      },
    },
  ];
  return inquirer.prompt(questions);
};

const init = () => {
  log(chalk.green('Welcome to SBP Genertator'));
};

const run = async () => {
  init();
  const answers: any = await askQuestions();
  const { FILENAME, EXTENSION } = answers;
  createFile(FILENAME, EXTENSION);
};

run();
