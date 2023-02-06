const db = require('./db.js')
const inquirer = require('inquirer')

module.exports.add = async function(tasks) {
  // 读取之前的任务
  const list = await db.read()
  // 把新的任务添加到数组中
  tasks.map(task => {
    list.push({ title: task, done: false })
  })
  // 把新的数组写入文件中
  await db.write(list)
}

module.exports.clear = async function() {
  await db.write([])
}

module.exports.show = async function() {
  const list = await db.read()
  showAllActions(list)
}

const showAllActions = (list) => {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: '请选择',
    choices: [
      { name: '退出', value: 'quit' },
      { name: '创建任务', value: 'askForCreate' },
      { name: '查看任务', value: 'askForShow' },
      { name: '清除任务', value: 'askForClear' },
    ]
  }).then(async (answers) => {
    switch(answers.action) {
      case 'askForCreate':
        askForCreate(list);
        break;
      case 'askForShow':
        askForShow(list);
        break;
      case 'askForClear':
        askForClear();
        break;
      default:
        break;
    }
  })
}

const askForCreate = list => {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: '请输入任务名称',
  }).then(answers => {
    if (answers.title) {
      list.push({
        title: answers.title,
        done: false
      })
      db.write(list)
    }
  })
}

const askForShow = list => {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: '请选择任务',
    choices: [
      { name: '退出', value: '-1' },
      ...list.map((task, index) => ({
        name: `${task.done ? '[√]' : '[x]'} ${index + 1} - ${task.title}`,
        value: index.toString()
      }))
    ]
  }).then(answers => {
    const index = parseInt(answers.action)
    if (index >= 0) {
      askForAction(list, index)
    }
  })
}

const askForAction = (list, index) => {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: '请选择你要执行的操作',
    choices: [
      { name: '退出', value: 'quit' },
      { name: '标记为已完成', value: 'markAsDone' },
      { name: '标记为未完成', value: 'markAsUndone' },
      { name: '修改标题', value: 'updateTitle' },
      { name: '删除任务', value: 'delete' },
    ]
  }).then(answers => {
    switch(answers.action) {
      case 'markAsDone':
        list[index].done = true
        db.write(list)
        break;
      case 'markAsUndone':
        list[index].done = false
        db.write(list)
        break;
      case 'updateTitle':
        inquirer.prompt({
          type: 'input',
          name: 'title',
          message: '请输入新标题',
        }).then(answers => {
          list[index].title = answers.title
          db.write(list)
        })
        break;
      case 'delete':
        list.splice(index, 1)
        db.write(list)
        break;
      default:
        break;
    }
  })
}

const askForClear = () => {
  inquirer.prompt({
    type: 'confirm',
    name: 'action',
    message: '确认清除所有任务？',
  }).then(answers => {
    if (answers.action) {
      db.write([])
    } else {
      console.log('取消清除')
    }
  })
}