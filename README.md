<p align="center">
  <img src="https://img.shields.io/badge/🇹🇭_Thailand-DTV_Visa_Guide-FFD700?style=for-the-badge&labelColor=003DA5" alt="DTV Visa Guide">
</p>

<h1 align="center">泰国 DTV 签证完全办理指南</h1>

<p align="center">
  <strong>Destination Thailand Visa — 数字游民 · 远程工作者 · 泰国文化爱好者的首选签证</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-≥18.0-339933?style=flat-square&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-v4-000000?style=flat-square&logo=express" alt="Express">
  <img src="https://img.shields.io/badge/SQLite-sql.js-003B57?style=flat-square&logo=sqlite" alt="SQLite">
  <img src="https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=flat-square&logo=netlify" alt="Netlify">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License">
</p>

<p align="center">
  <a href="https://th-dtv.netlify.app">🌐 在线访问</a> ·
  <a href="https://th-dtv.netlify.app/admin">🔧 管理后台</a> ·
  <a href="#快速开始">📖 快速开始</a>
</p>

---

## ✨ 系统亮点

| 特性 | 描述 |
|------|------|
| 🏛️ **全面签证指南** | 涵盖签证概览、申请资格、所需材料、办理流程、费用明细 |
| 📚 **智能知识库** | 20+ 精选 FAQ，支持关键词搜索，按类别分组 |
| 🎬 **实战案例库** | 30+ 来自 YouTube / X / 小红书 的真实申请经验 |
| 💬 **用户留言系统** | 支持注册登录、发评论、嵌套回复 |
| 🔧 **CMS 管理后台** | 板块管理、案例编辑、知识库维护、用户管理 |
| 🔒 **安全架构** | Helmet + JWT + bcrypt + Rate Limiting |
| 🌐 **中英双语** | i18n 国际化支持 |

---

## 🖼️ 系统截图

### 首页 — 签证概览
```
┌─────────────────────────────────────────┐
│  🇹🇭 泰国 DTV 签证 完全办理指南        │
│                                         │
│  5年 · 180天 · 多次入境 · ≈ ¥2,300      │
│                                         │
│  🔍 搜索DTV签证知识库...                │
│                                         │
│  ├── 📋 签证概览    ├── 📑 所需材料     │
│  ├── ✅ 申请资格    ├── 🔄 办理流程     │
│  ├── 💰 费用明细    ├── 🎬 教程案例     │
│  ├── ❓ 常见问题    └── 💬 用户留言     │
└─────────────────────────────────────────┘
```

---

## 🏗️ 技术架构

```
DTV/
├── server.js              # Express 主服务 (REST API + 静态文件)
├── database.js            # sql.js 兼容层 (支持本地/Serverless)
├── seed-content.js        # 国际化内容数据
├── netlify.toml           # Netlify 部署配置
├── netlify/
│   └── functions/
│       └── api.js         # Serverless Function 入口
├── public/
│   ├── index.html         # 前台主页 (SPA)
│   ├── admin.html         # 管理后台
│   ├── css/               # 样式文件
│   └── js/                # 客户端逻辑
└── package.json
```

### 核心技术栈

| 层级 | 技术 | 作用 |
|------|------|------|
| **后端** | Node.js + Express | RESTful API 服务 |
| **数据库** | sql.js (纯 JS SQLite) | 零依赖数据持久化 |
| **认证** | JWT + bcrypt | 无状态令牌认证 |
| **安全** | Helmet + Rate Limiting | HTTP 安全头 + 频率限制 |
| **压缩** | Gzip (compression) | 响应体压缩 |
| **部署** | Netlify Functions | Serverless 自动部署 |

---

## 🚀 快速开始

### 本地开发

```bash
# 1. 克隆仓库
git clone https://github.com/zixiang2008/DTV.git
cd DTV

# 2. 安装依赖
npm install

# 3. 启动开发服务器
node server.js
```

服务启动后访问：
- 🌐 前台：http://localhost:4000
- 🔧 管理后台：http://localhost:4000/admin
- 🔑 默认管理员：`admin` / `admin123`

### Netlify 部署

项目已配置 GitHub → Netlify 自动部署，每次推送到 `main` 分支即自动触发构建。

手动部署：
```bash
npx netlify-cli deploy --prod
```

---

## 📡 API 文档

### 公开接口

| 方法 | 路径 | 描述 |
|------|------|------|
| `GET` | `/api/knowledge` | 获取知识库 (`?q=关键词` 搜索) |
| `GET` | `/api/cases` | 获取案例 (`?platform=youtube&q=`) |
| `GET` | `/api/sections` | 获取板块配置 |
| `GET` | `/api/comments` | 获取留言列表 |
| `GET` | `/api/settings/:key` | 读取设置项 |
| `POST` | `/api/register` | 用户注册 |
| `POST` | `/api/login` | 用户登录 |
| `POST` | `/api/logout` | 退出登录 |
| `GET` | `/api/me` | 获取当前用户信息 |
| `POST` | `/api/comments` | 发表留言 (需登录) |

### 管理接口 (需 Admin 权限)

| 方法 | 路径 | 描述 |
|------|------|------|
| `GET/PUT` | `/api/admin/sections/:id` | 板块管理 |
| `GET/POST/PUT/DELETE` | `/api/admin/cases/:id` | 案例管理 |
| `GET/POST/PUT/DELETE` | `/api/admin/knowledge/:id` | 知识库管理 |
| `GET/PUT/DELETE` | `/api/admin/comments/:id` | 留言审核 |
| `GET/PUT` | `/api/admin/settings/:key` | 系统设置 |
| `GET` | `/api/admin/users` | 用户列表 |

---

## 🔐 安全特性

- **bcrypt 密码哈希** — 10 轮加盐哈希，安全存储用户密码
- **JWT 令牌认证** — 7 天过期，HttpOnly Cookie 防 XSS
- **Helmet 安全头** — 自动设置 X-Frame-Options、HSTS 等
- **Rate Limiting** — 认证接口 15 分钟 20 次限制，防暴力破解
- **Gzip 压缩** — 减少传输体积，加速页面加载
- **输入验证** — 留言长度限制 (1000 字)、密码最低 6 位

---

## 🌐 在线地址

| 环境 | 地址 |
|------|------|
| 🌍 **生产环境** | [th-dtv.netlify.app](https://th-dtv.netlify.app) |
| 🔧 **管理后台** | [th-dtv.netlify.app/admin](https://th-dtv.netlify.app/admin) |
| 📦 **GitHub** | [github.com/zixiang2008/DTV](https://github.com/zixiang2008/DTV) |

---

## 📄 License

MIT © 2025 DTV Visa Guide
