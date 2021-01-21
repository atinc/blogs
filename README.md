# Worktile 和 PingCode 的 Blog

**blog网站前端代码**

## 开发流程

> 所需的前置环境，`git`、`node.js（>=8.9.0）`（建议使用`nvm`管理node版本）、`docker`&`docker-compose`（建议去docker官网直接下载`Docker Desktop`）

##### clone代码

```bash
git clone git@github.com:worktile/wt-blog.git
```

##### 切换到项目文件并安装依赖

```bash
cd wt-blog && npm install
```

##### 开发步骤

1. 在docker环境中运行ghost

   ```bash
   npm run docker-init
   ```

2. 根据需求启动对应的项目

   ```bash
   # pingcode
   npm run dev:pc
   
   # worktile
   npm run dev:wt
   ```

3. pr通过后根据对应项目进行打包然后发给leader

   ```bash
   # pingcode
   npm run compress:pc
   
   # worktile
   npm run compress:wt
   ```

4. 更新 @atinc/dione-xxxxxx

   ```bash
   npm install -D @atinc/dione-worktile --registry=https://npm.pkg.github.com/
   npm install -D @atinc/dione-pingcode --registry=https://npm.pkg.github.com/
   ```

   npm run dione:wt

## 开发地址

http://localhost:6100/

## 用户名和密码

用户名： `admin@worktile.com` 

密    码：`worktile111111`
