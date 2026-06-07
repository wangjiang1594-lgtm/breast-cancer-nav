# 乳甲自我行（配套网站）

乳腺癌患者随访量表评估系统的**网页版**，与同名微信小程序**数据完全打通**：两端共用同一个腾讯 CloudBase 云环境（envId `cloud1-2gel0kpz50ce528a`）的 `patient_dict` / `submissions` 集合。患者在网页用同一凭证登录，答题记录与小程序互通。

技术栈：React 19 + Vite + Tailwind 4（纯静态前端）+ CloudBase HTTP 云函数 `web-api`（后端）。

## 目录结构

```
src/
  data/         questionnaires.js, plans.js   （从小程序原样移植的量表与方案数据）
  utils/        scoring.js（7 种计分）, timeline.js（节点解锁/重测判断）
  api.js        前端 API 客户端（fetch 调 web-api）
  views/        Login, Plans, Timeline, Questionnaire, Admin
  components/   AiChat, Modal, ResultModal
  App.jsx       登录态 + 视图路由
```

> **后端云函数 `web-api` 的源码不在本仓库**。约定其唯一源在小程序项目里：
> `WeChatProjects/miniprogram-4/cloudfunctions/web-api/`（与 handleplan、patientAuth 并列）。
> 本网站只通过 `.env` 的 `VITE_WEB_API_URL` 调用它，不再保留重复副本。

## 后端：部署 web-api 云函数

1. 在**微信开发者工具**打开 miniprogram-4 项目，右键 `cloudfunctions/web-api` → **上传并部署：云端安装依赖**。
2. 在云开发 / 腾讯云 CloudBase 控制台 → 环境管理 → **HTTP 访问服务**，为 `web-api` 绑定路径 `/web-api`（已配好：`https://cloud1-2gel0kpz50ce528a-1373389857.ap-shanghai.app.tcloudbase.com/web-api`）。
3. 给 `web-api` 配置**环境变量**：
   - `DEEPSEEK_API_KEY`：DeepSeek API Key（AI 问答用）
   - `ADMIN_PIN`：管理后台 PIN（不设则默认 `888888`，**上线务必修改**）
   - 可选 `DEEPSEEK_MODEL`（默认 `deepseek-chat`）

## 前端：本地运行 / 构建

1. `cp .env.example .env`，把 `VITE_WEB_API_URL` 改为上一步绑定得到的 URL。
2. 开发：`npm install` → `npm run dev`
3. 构建：`npm run build` → 产物在 `dist/`，部署到 **CloudBase 静态网站托管**（推荐，同环境一体化）或 Vercel/Firebase Hosting（仓库已含两者配置，纯静态托管即可）。

## 与小程序的关系

- 同一云数据库、同一批集合 → 数据天然打通，无需 AppSecret / IP 白名单。
- 鉴权在云函数内部完成：患者请求需带已登记的 `identifier`（凭证），管理请求需带 PIN。
- 网页端无微信 openid，提交记录的 `_openid` 写为 `"web"`，其余字段与小程序 `handleplan` 完全一致（含 `submitCount` 重测计数）。
