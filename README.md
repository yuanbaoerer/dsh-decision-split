# dsh-decision-split

决策分屏插件 —— DeepSeek Harness Web UI 的分屏阅读工作台。

**解决什么痛点**：agent 输出长方案时，单一的滚动窗口让「通读全文」和「边看边操作」互相干扰——看完后面忘了前面，对照多处细节要反复上下滚动。本插件在消息尾部提供一个「在侧栏查看全文」入口，把该条 agent 消息的完整 markdown 放到右侧详情栏独立滚动展示，主窗口保持当前操作位置不变。

- **入口**：每条含文本的 agent 消息尾部固定显示「在侧栏查看全文」按钮；
- **右侧详情栏**：独立滚动展示该条消息的完整 markdown（含表格/代码块/行内 code），侧栏标题自动取消息首个标题；打开时默认以 480px 宽展示（插件内置适配：在 harness 面板宽度 clamp [300,520] 内改默认，窄视口让步链与用户拖拽均不受影响，无需改 harness 任何文件）；
- **无输入框、无决策回传**：决策与提问统一交给 harness 原生的 `ask_user_question` 能力，本插件不再内嵌输入框，避免与原生输入框、原生决策卡片冲突。

视觉完全对齐 DSH Web UI 原生设计变量（`--dsw-*` tokens、MarkdownText 字体规范、原生按钮样式）。

## 效果图

![dsh-decision-split 效果图](https://raw.githubusercontent.com/yuanbaoerer/dsh-decision-split/master/docs/dsh-decision-split.png)

*消息尾部的「在侧栏查看全文」入口，以及右侧详情栏的完整方案展示。*

## 安装

从 npm 安装（推荐）：

```sh
dsh plugin --profile web add dsh-decision-split
```

或从 GitHub release 安装（资产名中的版本号跟随最新 release）：

```sh
dsh plugin --profile web add https://github.com/yuanbaoerer/dsh-decision-split/releases/latest/download/dsh-decision-split-0.2.2.tgz
```

安装后重启 `dsh web` 生效。

## 使用方式

装上即用，无需额外配置。每条含文本的 agent 消息尾部都会出现「在侧栏查看全文」按钮，点击即在右侧详情栏独立滚动阅读该条消息的完整内容；侧栏正在展示该条消息时再点一次按钮（按钮此时显示为「收起侧栏」）即收回；点击其它消息的按钮可切换展示目标，点侧栏右上角 × 也可收起。

> 决策/提问请使用对话里的原生提问能力（agent 调用 `ask_user_question` 时界面会弹出可点选卡片），本插件专注「分屏阅读」这一件事。

## License

MIT

---

> 开发与发布说明见 [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)。
