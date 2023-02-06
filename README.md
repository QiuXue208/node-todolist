# 用node实现一个todolist工具，并上传至npm

### 功能
  1. 添加任务
  2. 删除任务
  3. 清除任务
  4. 修改任务标题
  5. 修改任务状态

### 工具库
  1. commander：编写代码来描述您的命令行界面
  2. inquirer：交互式命令行用户界面

### 如何上传到npm
  1. 修改package.json文件
  ```
  {
    // npm包名称
    "name": "xxx",
    // npm包版本
    "version": "1.0.0",
    // td相当于执行node cli.js
    "bin": {
      "td": "cli.js"
    },
    // 告诉npm哪些文件是有用的
    "files": ["*.js"]
  }
  ```
  2. 为cli.js文件添加Shebang
  ```
  // 告诉操作系统，使用哪个解释器来执行js文件
  #!/usr/bin/env node
  ```
  3. 给cli.js加一个可执行权限
  ```
  chmod +x cli.js
  ```
  4. 使用npm源
  ```
  nrm use npm
  ```
  5. 登录npm
  ```
  npm adduser
  ```
  6. 发布包
  ```
  npm publish
  ```
### 如何使用

  1. 下载todolist npm包
  ```
  yarn global add node-todolist
  ```
  2. 使用node-todolist
  ```
  Options:
    -V, --version    //查看版本号
    -s, --separator  //默认分隔符(,)
    -h, --help       //查看命令
  Commands:
    add <任务名>      //添加任务
    clear            //清空任务
    show             //展示所有可操作选项
  ```
