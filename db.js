const fs = require('fs')
const path = require('path')
const home = process.env.HOME || require('os').homedir()
const dbPath = path.join(home, '.todo')

module.exports = {
  read(path = dbPath) {
    return new Promise((resolve, reject) =>{
      fs.readFile(path, { flag: 'a+' }, (error, data) => {
        if (error) return reject(error)
        let list
        try {
          list = JSON.parse(data.toString())
        } catch(error) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, JSON.stringify(list), (error) => {
        if (error) return reject(error)
        resolve('添加成功')
      })
    })
  }
}