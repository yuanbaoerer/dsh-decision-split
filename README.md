# dsh-decision-split

DeepSeek Harness Web UI 的分屏阅读插件：把 agent 消息放到右侧详情栏独立滚动展示。

> **DSH 版本**：0.2.5 起适配 DSH `0.2.x`（在 `0.2.1-rc.2` 实测），内容渲染在右侧栏的原生 rightbar Tab 中；DSH `0.1.x` 请继续使用 0.2.4。

## 功能

- **入口按钮**：每条已完成轮次的含文本 agent 消息尾部显示「在侧栏查看全文」按钮（回复生成结束后出现，进行中的轮次不显示）；
- **右侧详情栏**：以 rightbar Tab 展示该条消息的完整 markdown（表格、代码块、行内 code），独立滚动；Tab chip 标题跟随该消息首个标题；
- **切换与开合**：点击其它消息的按钮会复用同一个 Tab 并切换内容，不会重复开 Tab；收起用右侧栏自带的 Tab 关闭或「收起右侧边栏」控件；
- **与 harness 动作共存**：按钮注册在 `conversation.chat.assistant-actions`，与 harness 自带的「产物」「反馈」等消息动作并排显示，互不抢占；
- **详情栏宽度**：使用 rightbar 默认宽度（首次约 45% 视口，用户拖动后保持），插件不再固化宽度；
- **不含决策输入**：无内嵌输入框、无决策回传；决策与提问使用 harness 原生 `ask_user_question`。

## 效果图

![dsh-decision-split 效果图](https://raw.githubusercontent.com/yuanbaoerer/dsh-decision-split/master/docs/dsh-decision-split.png)

*消息尾部的「在侧栏查看全文」入口，以及右侧详情栏的完整内容展示（截图为 0.1.x 旧版 UI，0.2.x 使用 rightbar Tab 外观）。*

## 安装

从 npm 安装（推荐）：

```sh
dsh plugin --profile web add dsh-decision-split
```

或从 GitHub release 安装（资产名中的版本号跟随最新 release）：

```sh
dsh plugin --profile web add https://github.com/yuanbaoerer/dsh-decision-split/releases/latest/download/dsh-decision-split-0.2.5.tgz
```

安装后重启 `dsh web` 生效。

## 使用方式

装上即用，无需配置。已完成轮次的含文本 agent 消息尾部会出现「在侧栏查看全文」按钮，点击即在右侧栏阅读该条消息的完整内容；切换消息会复用同一个 Tab，收起用右侧栏自带的关闭/收起控件。

## License

MIT

---

> 开发与发布说明见 [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)。
