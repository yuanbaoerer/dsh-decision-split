# 开发与发布

## 目录结构

```text
dsh-decision-split/
  package.json      # dsh.bundle.patch + dsh.client 清单（web 客户端插件）
  cordis.patch.yml  # bundle patch：insert 自身
  lib/index.js      # host 半（空壳）
  lib/client.js     # client 半（window.__ModuleLoader__ bundle）
  docs/             # 效果图、开发文档等资源（README 用 GitHub raw 绝对地址引用，npm 页也能渲染）
```

## 开发

修改客户端半（`lib/client.js`）后：服务端按请求直接读磁盘文件，**刷新浏览器页面（建议硬刷新）即生效，无需重启**（`dsh web` 的 HMR 处于禁用状态）。修改 host 半（`lib/index.js`）则需重启 `dsh web`（服务启动时加载）。

> 本地开发常用对称：可直接把仓库 `lib/` 覆盖到 `$DSH_HOME/profiles/web/node_modules/dsh-decision-split/` 后刷新验证（本仓库即用此方式迭代）。

## 发布新版本

1. bump `package.json` 的 `version`（语义化版本，如 `0.1.5` → `0.1.6`）；
2. 提交并推送；
3. 只需创建 GitHub release，其余全部自动：

```sh
gh release create v<version>
```

`.github/workflows/npm-publish.yml` 会在 release `published` 时自动执行：
`npm publish`（使用仓库 secret `NPM_TOKEN`）并把 tgz 附件上传到该 release。

- `NPM_TOKEN` 在 GitHub 仓库 Settings → Secrets and variables → Actions 中配置，
  值为 npm 发布 token（granular access token，勾选该包 publish 权限 + bypass 2FA，
  或 classic automation token）。
- 若只改了 README/docs（无代码变更），发布后无需升级本地已安装的插件版本。
