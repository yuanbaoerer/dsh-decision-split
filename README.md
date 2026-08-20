# dsh-decision-split

决策分屏插件 —— DeepSeek Harness Web UI 的决策工作台。

当 agent 输出包含「决策摘要」段（任意标题层级，如 `## 决策摘要`、`### 决策要点`）的方案时：

- **主窗口**：消息下方自动出现「决策摘要」卡片 —— 摘要内容 + 决策输入框 + 「侧栏查看全文」「发送决策」两个按钮；
- **右侧详情栏**：独立滚动展示该方案的完整 markdown，侧栏标题自动取方案首个标题；
- **发送决策**：决策以 `【决策】…` 前缀作为一条消息回传给 agent，让它基于你的决策继续推进。

视觉完全对齐 DSH Web UI 原生设计变量（`--dsw-*` tokens、MarkdownText 字体规范、原生按钮样式）。

## 效果图

![dsh-decision-split 效果图](https://raw.githubusercontent.com/yuanbaoerer/dsh-decision-split/master/docs/dsh-decision-split.png)

*主窗口的「决策摘要」卡片（摘要 + 决策输入框 + 操作按钮），以及右侧详情栏的完整方案展示。*

## 安装

从 npm 安装（推荐）：

```sh
dsh plugin --profile web add dsh-decision-split
```

或从 GitHub release 安装：

```sh
dsh plugin --profile web add https://github.com/yuanbaoerer/dsh-decision-split/releases/latest/download/dsh-decision-split-0.1.3.tgz
```

安装后重启 `dsh web` 生效。

## 使用约定

让 agent 在输出方案时，用固定格式列出待决策点，例如在指令里加一句：

> 输出方案时，最后用 `## 决策摘要` 段列出所有需要我拍板的决策点。

插件识别的标记（任意标题层级 `##`–`######`、忽略大小写、允许结尾冒号）：

`决策摘要` · `决策要点` · `待决策清单` · `决策清单` · `决策事项` · `Decision Summary` · `Decision Points`

## 开发

```text
dsh-decision-split/
  package.json      # dsh.bundle.patch + dsh.client 清单（web 客户端插件）
  cordis.patch.yml  # bundle patch：insert 自身
  lib/index.js      # host 半（空壳）
  lib/client.js     # client 半（window.__ModuleLoader__ bundle）
  docs/             # 效果图等资源（README 用 GitHub raw 绝对地址引用，npm 页也能渲染）
```

修改 `lib/client.js` 后重启 `dsh web` 生效。发布新版本（先 bump `package.json` 的 version 并打 tag）：

```sh
npm pack                       # 生成 dsh-decision-split-<version>.tgz
gh release create v<version> dsh-decision-split-<version>.tgz   # GitHub release
npm publish                    # npm registry（需带 bypass-2FA 的发布 token）
```

## License

MIT
