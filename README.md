# Chat App (React + Node.js + Socket.io)

## 專案簡介
本專案是一個即時聊天應用，前端採用 React + Vite，後端採用 Node.js + Express + MongoDB，並整合 Socket.io 實現即時訊息推送。

## 目錄結構
```
chat-app-yt/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   └── server.js
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── package.json
└── README.md
```

## 主要功能
- 使用者註冊/登入/登出
- 即時訊息推送（Socket.io）
- 多人聊天室
- 前端搜尋/切換聊天對象
- 狀態管理（Zustand, Context）
- 前端自動捲動、shake動畫提醒

## 安裝與啟動
1. 安裝所有依賴：
   ```bash
   npm install
   npm install --prefix frontend
   ```
2. 建立 .env 檔案，設定 MongoDB 連線字串與 JWT 密鑰。
3. 啟動後端伺服器：
   ```bash
   npm run server
   ```
4. 啟動前端開發伺服器：
   ```bash
   cd frontend
   npm run dev
   ```

## 部署
- 前端 build：
  ```bash
  npm run build --prefix frontend
  ```
- 後端會自動提供 dist 靜態檔案。

## 注意事項
- 請勿將 .env 檔案提交到版本控制。
- 若遇到路由錯誤，請檢查 Express 路徑格式。
- Socket.io server 需獨立啟動並與前端端口一致。

## 聯絡方式
如有問題請聯絡專案負責人。
