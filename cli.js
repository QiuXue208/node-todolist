const { program, Command } = require('commander');
const { add, clear } = require('.');
const version = require('./package.json').version;

program
  .name('todo-list')
  .description('CLI to some JavaScript string utilities')
  .version(version);

program
  .option('-s, --separator <char>', 'separator character', ',');

program.command('add')
  .description('add task(s) to the todo-list')
  .argument('<string>', 'string to split')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    const tasks = str.split(options.separator, limit)
    add(tasks)
  });

program.command('clear')
  .description('clear the todo-list')
  .action(() => {
    clear()
  });

program.parse();
