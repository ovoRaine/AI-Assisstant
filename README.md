# 小团点餐助手（美团外卖 AI 餐饮推荐交互演示）

本项目为**纯前端交互演示应用**（无需任何后端或 API Key），支持一键部署至 **GitHub Pages** 生成在线可交互链接。

## 如何发布到 GitHub 并生成在线交互链接（GitHub Pages）

1. **同步/上传代码到 GitHub 仓库**
   - 点击 AI Studio 右上角的 **Export to GitHub**（或下载压缩包后推送到你的 GitHub 仓库 `main` 分支）。
2. **开启 GitHub Pages（仅需设置一次）**
   - 打开你的 GitHub 仓库页面，点击顶部菜单 **Settings** -> 左侧栏 **Pages**。
   - 在 **Build and deployment** -> **Source** 下拉框中，选择 **`GitHub Actions`**。
3. **点击链接体验**
   - 仓库内已内置 `.github/workflows/deploy.yml` 自动部署脚本。
   - 等待约 1 分钟构建完成后，在仓库 **Actions** 或 **Settings -> Pages** 页面即可看到生成的在线交互链接：
     `https://<你的GitHub用户名>.github.io/<仓库名称>/`
   - 任何人在手机或电脑浏览器点击该链接，即可直接进行完整点餐推荐、修改饮食偏好、换一换、进入餐厅点菜结算等交互体验。

## 本地运行

```bash
npm install
npm run dev
```
