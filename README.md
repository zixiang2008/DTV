# 泰国 DTV 签证完全指南 (DTV Visa Guide)

此项目是一个提供泰国 Destination Thailand Visa (DTV) 相关信息、办理流程、教程案例及问答的综合性网站系统。包含完整的用户登录注册、知识库、留言互动等功能，后端采用 Node.js (Express) 和 SQLite 数据库构建。

## 🎯 项目特点

- **前后端分离结构**：后端提供 REST API（`server.js`），前端为原生 HTML/JS/CSS（位于 `public/` 目录），方便维护。
- **内置安全保护**：集成 `helmet`，`express-rate-limit`（防刷请求），密码使用 `bcrypt` 哈希，支持 JWT 验证。
- **本地知识图谱**：采用轻量且高性能的 SQLite 数据库 (`dtv.db`)，内置常见问题、教程案例数据库。
- **长期稳定运行**：代码逻辑包含对 Express 5.x 路由及同步数据库故障的容错处理，极大提升了服务稳定性。

## 📂 核心目录结构

```text
DTV/
├── public/                 # 前端资源目录 (HTML, CSS, JS)
│   ├── index.html          # 主页视图
│   ├── admin.html          # 后台管理面板视图
│   ├── script.js           # 前端交互逻辑
│   ├── styles.css          # 前端样式组件
│   └── i18n.js             # 国际化语言支持脚本
├── server.js               # Node.js 后端主服务代码
├── seed-content.js         # 初始数据填充脚本
├── ecosystem.config.js     # PM2 进程守护配置文件 (用于长效运行)
├── start.bat               # Windows 环境快速启动辅助脚本
├── package.json            # 项目依赖描述
└── dtv.db                  # (自动生成) SQLite 数据库文件
```

## 🛠️ 如何启动和安装

### 1. 安装环境依赖

确保您的计算机上已经安装了 Node.js (推荐 v20 以上环境)。在项目根目录下，执行：

```bash
npm install
```

### 2. 启动方式 (推荐)

项目内提供多种启动方式，可根据具体环境选择：

- **普通开发启动** (Windows快捷方式)：
  双击目录下的 `start.bat` 文件，服务器将自动启动。

- **命令行启动**：
  ```bash
  npm start
  # 或者输入
  node server.js
  ```

- **服务器长期稳定部署 (使用 PM2)**：
  如果需要 7x24 小时无人值守运行（断网恢复、奔溃自动重启），建议使用 PM2：
  ```bash
  npm install -g pm2
  pm2 start ecosystem.config.js --env production
  pm2 save
  pm2 startup
  ```

服务器启动后，控制台会显示：
✅ `🇹🇭 DTV签证指南服务器运行中: http://localhost:4000`

### 3. 数据初始化

项目首次运行 `server.js` 时，会自动创建 `dtv.db`，并包含默认的测试用例和知识库内容。无需手动执行数据库构建脚本。

## 🛑 常见问题及排障

**Q1：页面出现连接拒绝 (ERR_CONNECTION_REFUSED) 或者 API 调用挂起？**
A：在此次代码更新中，修复了由于 Express 5 在部分环境遇到未兼容的 `*path` 全局路由捕获语法时导致的致命崩溃 (Crash) 缺陷。此版本已变更为标准 `app.use()` 挂载静态文件流回调。如果问题再现，推荐查阅终端报错日志 (`pm2 logs`) 或检查您所在环境防火墙端口 4000 组策略。

**Q2：如何更改运行端口？**
A：服务器默认使用 `4000` 端口。你可以直接修改 `server.js` 第 12 行的 `PORT` 常量，或者在运行前设置环境变量 `PORT`，如果你使用 pm2 请同步修改 `ecosystem.config.js` 的映射段。

## 🔒 默认管理凭证

项目已自动生成的默认管理凭证：
- **后台地址**：`http://localhost:4000/admin`
- **账号**: `admin`
- **密码**: `admin123`

请在项目成功部署且稳定外网公开后，及时在后台或数据库中修改默认管理员密码。
