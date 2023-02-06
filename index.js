const db = require('./db.js')

module.exports.add = async function(tasks) {
  // 读取之前的任务
  const list = await db.read()
  // 把新的任务添加到数组中
  tasks.map(task => {
    list.push({ task, done: false })
  })
  // 把新的数组写入文件中
  await db.write(list)
}

module.exports.clear = async function() {
  await db.write([])
}