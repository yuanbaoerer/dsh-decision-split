# Agent Note: rightbar-tab-migration

Status: implemented

## Problem

DSH 0.2.1-rc.2 把右侧详情栏从 `details` 槽 + `ctx.layout.openDetails/closeDetails` 重构成 `rightbar` / Tab 体系后，dsh-decision-split 0.2.4 的入口按钮仍能渲染，但点击会调用已删除的 `layout.openDetails()` 抛 `TypeError`，SidePanel 也因 `details` 槽不存在而永远不注册，插件核心功能不可用。

## Decision

0.2.5 把客户端半改成一个页面型 rightbar Tab：`inject = ["slots","sidebarRight","sidebarRightTabs"]`；`ctx.effect` 内用 `ctx.sidebarRightTabs.register({ id: "dsh-decision-split", kind: "decision-split", title: () => "方案全文" })` 声明类型；body 注册在 `sidebar.right.pane.tab`（key 为 `dsh-decision-split`），title 注册在 `sidebar.right.pane.tab.title`；按钮改为 `ctx.sidebarRight.openTab("decision-split", { params: { messageId } })`。body 通过 `useTabInfo()` 读 `tab.navigation.params.messageId`，继续用 `useChat(s => s.legacy.nodes)` 按 durable `messageId` 找 assistant 节点，markdown 渲染逻辑原样保留。插件不再调用 `ctx.layout`、不再包装 `attachPanels`、不设置宽度、不自绘关闭按钮；收起完全交给 rightbar 原生的 Tab 关闭与「收起右侧边栏」。按钮文案固定为「在侧栏查看全文」，同一条消息再次点击只聚焦，不同消息复用同一个 Tab。已知边界：page 的 `params` 不随布局持久化，刷新后恢复的 Tab 没有 `messageId`，body 显示空状态；`tab.navigation.params` 只按运行时 JSON 使用，不做类型校验。
## Alternatives considered

**替换 `rightbar.session` 单槽**：可以直接接管整个右侧栏内容并保留旧的自绘面板，但会遮蔽官方 ui-sidebar-right 的 Tab/分栏/文件预览等 UI，属于 shadows-shipped-ui，放弃。**resource 类型 + `dsh-resource://decision-split/...` 地址**：`contentId` 会被布局持久化、跨 pane 去重也更自然，但消息不是真实资源，固定地址时需要把 `messageId` 放进 params 才能切换，等于仍不持久化；按消息编地址又会一消息一 Tab，违背单面板切换的产品行为，且会为假地址 pin 一个无 provider 的 resource 记录，放弃。**继续包装 `layout.attachPanels` / `openDetails` 固定宽度**：这两个 API 在 0.2.x 已不存在，工作区里已有的包装在 0.2.1-rc.2 上是死代码，放弃。**保留旧版「收起侧栏」动态文案**：`ctx.sidebarRight.active()` / `isExpanded()` 不是响应式 hook，需要自建 store 并在 Tab body 里回报状态；为一个人工同步的按钮文案引入跨组件状态，收益低于使用原生收起控件，放弃。
## Consequences

修复后 0.2.5 在 DSH 0.2.1-rc.2 上实测通过：入口按钮出现，点击在 rightbar 里打开 `dsh-decision-split` Tab，markdown/表格渲染，chip 标题跟随消息首个标题，重复点击不重复开 Tab，原生收起后可由按钮重新展开，无运行时异常。代价是 UX 变化（不再有「收起侧栏」按钮文案与自绘 X，关闭/收起改用右侧栏原生控件）、刷新后 Tab 内容不恢复、按钮不再切换为收起态；同时插件把自身绑定到 0.2.x 的 `sidebarRightTabs`/`sidebar.right.pane.tab` 契约，DSH 再次重构右侧栏时需要重新迁移。文档同步更新在 docs/COMPATIBILITY.md 与 README.md。

