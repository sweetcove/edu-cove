# 萃煊

承前人之智,拓万象之境。

## 本地开发

### 1. 安装依赖
```bash
npm install
```

### 2. 启动数据服务
```bash
npm run server
```

### 3. 启动前端服务
```bash
npm run dev
```

访问: http://localhost:5173/edu-cove/

## 常用指令

| 指令 | 说明 |
| :--- | :--- |
| `npm run dev` | 启动前端开发服务器 |
| `npm run server` | 启动本地数据服务 (json-server) |
| `npm run build` | 构建生产环境代码 |
| `npm run preview` | 预览构建后的产物 |
| `npm run clean` | 清理构建生成的 dist 目录 |

## GitHub Pages 部署

推送代码到 `main` 分支后,GitHub Actions 会自动构建并发布到 GitHub Pages。

访问地址: https://sweetcove.github.io/edu-cove/
