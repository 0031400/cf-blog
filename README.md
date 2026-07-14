### 简介
一个运行在 cloudflare worker 使用 cloudflare d1 以 nextjs 为框架的简单个人博客
### 仓库
https://github.com/0031400/cf-blog
### 工作栈
- nextjs
- tailwindcss
### 功能
- 管理页面
- 分页
- markdown 渲染
- 局部刷新
### 图片
![首页](images/1.png)
![详情页](images/2.png)
![后台页面](images/3.png)
![后台列表](images/4.png)
![编辑文章页面](images/5.png)
### 部署教程
#### linux 本地部署
> windows 的 opennextjs-cloudflare 暂时有问题

编写 `.env` 文件
```
ADMIN_TOKEN=123456
BLOG_TITLE="admin's blog"
BLOG_SUBTITLE="admin的博客"
BLOG_AUTHOR=admin
```
运行命令
```
git clone https://github.com/0031400/cf-blog
yarn
yarn deploy
```