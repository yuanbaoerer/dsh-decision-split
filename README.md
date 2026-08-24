# dsh-decision-split

决策分屏插件 —— DeepSeek Harness Web UI 的决策工作台。

**解决什么痛点**：agent 输出长方案时，单一的滚动窗口让「通读全文」和「逐条拍板」互相干扰——看完后面忘了前面，对照多个决策点要反复上下滚动，决策只能靠脑子硬记。本插件把两者拆开：右侧详情栏独立滚动展示完整方案，主窗口固定显示决策摘要与决策输入框，边看全文边写决策、一键回传 agent。

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

或从 GitHub release 安装（资产名中的版本号跟随最新 release）：

```sh
dsh plugin --profile web add https://github.com/yuanbaoerer/dsh-decision-split/releases/latest/download/dsh-decision-split-0.1.6.tgz
```

安装后重启 `dsh web` 生效。

## 使用方式

装上即用，无需额外配置。触发遵循一个核心原则：**只有当回复确实呈现「多个决策点」或「多个可选方案」、需要你逐个阅读逐个拍板时才出卡**，而不是看标题存不存在、也不是看内容长短。

- **语义触发（客户端识别）**：回复内容满足以下任一条件即触发（纯说明性长文、普通问答不会误触发）：
  - **≥2 个决策点**：如 `**决策 1：**`、`**决策 2：**`、`决策点二：`、`待确认：` 等；
  - **≥2 个方案/选项**：如 `方案 A`、`方案 一`、`选项 1`、`备选 2` 等；
  - **对比类表格**：表头含 `方案/选项/备选/对比/选择` 且有 ≥2 行对比数据。
- **决策段触发**：回复中出现 agent 主动写的非空决策段标题（任意层级 `#`–`######`、忽略大小写、允许结尾冒号）也触发，摘要区展示该段内容：

`决策摘要` · `决策要点` · `待决策清单` · `决策清单` · `决策事项` · `方案对比` · `方案选择` · `需要决策` · `待决策` · `待确认` · `待拍板` · `请你决定` · `请拍板` · `决策项` · `决策点` · `Decision Summary` · `Decision Points` · `Decision Required` · `Decision Needed` · `Please Decide` · `Please Choose` · `Need Your Decision` · `Options` · `Choices`

- **host 注入提示词**：插件会在系统提示中告知 agent——当回复包含需要你拍板的决策点、或给出多个方案让你选择时，用 `**决策 N：**` 逐条列出，以便即便 agent 不写标题、客户端也能按上面的语义规则识别出来。

> 也可在对话里给 agent 补一句「输出方案时若需我拍板，请在最后用 `## 决策摘要` 段列出决策点」——手动约定与自动注入效果相同，属可选的加强。

## License

MIT

---

> 开发与发布说明见 [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)。
