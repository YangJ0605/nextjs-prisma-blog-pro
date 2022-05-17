#### nextjs

- 启动开发服务 pnpm dev
- 打包 pnpm build
- 启动 pnpm start

#### 在根目录下创建.env文件,写入如下
```
DB_URL='postgresql://用户名:用户密码@域名加端口号/数据库名称'
```
#### prisma

- 迁移 pnpm m:db
- 启动 prisma 可视化: npx prisma studio