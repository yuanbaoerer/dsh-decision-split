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

## 使用约定

在对话开始时给 agent 一条指令（或写进你的 agent 预设），让它输出方案时固定带决策段：

> 输出方案时，如果包含需要我决策的事项或多种方案对比（如 A/B/C 选一），请在方案最后用 `## 决策摘要` 段列出所有需要我拍板的决策点，每个决策点用 `**决策 N：**` 开头。

插件识别的标记标题（任意标题层级 `#`–`######`、忽略大小写、允许结尾冒号）：

`决策摘要` · `决策要点` · `待决策清单` · `决策清单` · `决策事项` · `方案对比` · `方案选择` · `需要决策` · `待决策` · `待确认` · `待拍板` · `请你决定` · `请拍板` · `决策项` · `决策点` · `Decision Summary` · `Decision Points` · `Decision Required` · `Decision Needed` · `Please Decide` · `Please Choose` · `Need Your Decision` · `Options` · `Choices`

> 只要方案中出现以上任一标题（如 `## 方案对比` 或 `## 待确认`），决策卡就会自动出现——即使 agent 没写 `决策摘要` 段。

## License

MIT

---

> 开发与发布说明见 [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)。
