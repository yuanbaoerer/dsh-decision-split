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

修改 `lib/client.js` 后重启 `dsh web` 生效（客户端插件在浏览器侧加载）。

## 发布新版本

1. bump `package.json` 的 `version`（语义化版本，如 `0.1.3` → `0.1.4`）；
2. 提交并推送（`git tag` 可选，release 自带 tag）；
3. 依次执行：

```sh
npm pack                       # 生成 dsh-decision-split-<version>.tgz
gh release create v<version> dsh-decision-split-<version>.tgz   # GitHub release
npm publish                    # npm registry（需带 bypass-2FA 的发布 token）
```

4. 若只改了 README/docs（无代码变更），发布后无需升级本地已安装的插件版本。
