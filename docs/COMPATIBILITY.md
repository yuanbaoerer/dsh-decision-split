# 兼容性验证记录

本文件记录 dsh-decision-split 在不同 DSH 版本下的验证结果。每次升级 DSH 后按此清单复核，并更新最新一行。

## 验证清单（30 秒冒烟）

1. agent 消息（含文本）尾部出现「在侧栏查看全文」按钮；
2. 点击 → 右侧详情栏独立滚动展示完整 markdown（含表格/代码块/行内 code）。0.1.x 走 `details` 列，0.2.x 应走 `rightbar` 的 Tab，见下方迁移路线；
3. 点击另一条消息的按钮 → 复用同一个 Tab 并切换内容；点 Tab 的关闭或右侧栏「收起右侧边栏」→ 收起；
4. 不再出现决策卡、内嵌输入框、「发送决策」按钮（0.2.0 起已移除）。

## 已验证版本

| DSH 版本 | 插件版本 | 结论 | 日期 | 备注 |
|---|---|---|---|---|
| 0.1.0-rc.8 | 0.1.7 | ✅ 兼容 | 2026-08-21 | 源码逐项核对 + 运行时验证通过（决策卡/决策回传）；首次测试未出现系浏览器缓存，硬刷新后正常 |
| 0.1.2-rc.1 | 0.2.4 | ✅ 兼容 | 2026-09-07 | 源码逐项核对（见明细表）+ 运行时验证：按钮在消息尾部渲染、`useChat` 快照 `legacy.nodes` 按消息匹配命中；0.2.3 起注册于 `conversation.chat.assistant-actions`（list 槽）与「产物」按钮共存；0.2.4 修复 hooks 顺序（`useChat`/`useActiveSeq` 必须早于按数据早退的 `return`） |
| 0.2.1-rc.2 | 0.2.4 | ❌ 不兼容 | 2026-10-19 | 右侧详情栏重构为 `rightbar`/Tab 体系：`details` 槽与 `ctx.layout.openDetails/closeDetails` 均已移除。入口按钮仍渲染，但点击抛 `TypeError`，侧栏无法打开（详见下方「0.2.1-rc.2 适配结论」） |
| 0.2.1-rc.2 | 0.2.5 | ✅ 兼容 | 2026-10-19 | 按 rightbar Tab 体系重写：页面型 Tab + `sidebar.right.pane.tab(.title)`；入口按钮经 `ctx.sidebarRight.openTab` 打开/聚焦，收起走右侧栏原生控件。运行时 E2E 验证通过（按钮 → 打开 rightbar、markdown/表格渲染、动态标题、收起后重开，无 `Runtime.exceptionThrown`） |

## 0.2.1-rc.2 适配结论（2026-10-19 实测）

实测环境：`dsh 0.2.1-rc.2`（npm `next` 标签，本机安装版）+ 插件 0.2.4。结论来自运行时 Cordis Inspect（Client Slots / Service / Theme）与 `@deepseek-ai/dsh-client-ui-layout`、`@deepseek-ai/dsh-client-ui-sidebar-right` 的公开契约，而非仅看源码。

### 仍然成立

| 依赖 | 状态 |
|---|---|
| `window.__ModuleLoader__.load` bundle 加载 | ✅ `conversation.chat.assistant-actions` occupants 中插件仍 active |
| `conversation.chat.assistant-actions`（list/session） | ✅ 仍在；owner 仍只传 `{ messageId }`，standardProps 仍含 `useChat` |
| `useChat(s => s.legacy.nodes)` | ✅ `ChatSnapshot.legacy.nodes` 仍为 `ConversationNode[]`；assistant 节点仍有 `messageId/seq/blocks`，`{kind:"text",text}` block 未变 |
| `inject: ["slots","layout"]` | ✅ 两个服务仍在（插件已加载并注册） |
| 插件用到的 `--dsw-alias-*` token | ✅ border-l2 / bg-base / bg-layer-1 / bg-layer-2 / label-primary / label-secondary / brand-primary 均在当前 14 个 token 内 |

### 已断裂

1. **`details` 槽已不存在**（Inspect `requestedRoot.available=false`）。`slots.inject("details", …)` 对未声明槽只是挂起等待、不报错，因此 `SidePanel` 永远不注册。
2. **`ctx.layout` 服务面已换成 rightbar API**：当前只有 `selectPanel / beginNavigation / toggleSidebar / openRightbar(track, fullscreen) / closeRightbar`；`openDetails()`、`closeDetails()`、`attachPanels()`、`setDetails()` 全部不存在。
3. 入口按钮仍在，但 `toggle()` 调用 `layout.openDetails()/closeDetails()` 会抛 `TypeError: layout.openDetails is not a function`。由于 `setActiveSeq()` 在调用布局前已执行，首次点击还会把按钮文案切成「收起侧栏」却不出面板——表现为“按钮可点、无面板”。
4. 右侧栏由 `@deepseek-ai/dsh-client-ui-sidebar-right` 接管：`rightbar`（single/root）→ `rightbar.session`（single/session）→ `sidebar.right.pane.tab`（keyed/session，按 tab 类型 id 分发）。`rightbar.session` 已被官方 UI 占用，插件不能直接替换。
5. 工作区中针对 `layout.attachPanels` 的宽度包装在 0.2.1-rc.2 上同样是死代码；rightbar 宽度是布局 store 的瞬时偏好（首次 45% 视口、用户拖动、上限 70%），没有公开 setter。

### 迁移路线（0.2.x，已在 0.2.5 落地）

按官方扩展点改成一个 **rightbar Tab 类型**，而不是自己开详情栏：

1. `inject` 改为 `["slots", "sidebarRight", "sidebarRightTabs"]`，不再依赖 `layout`。
2. `ctx.effect(() => ctx.sidebarRightTabs.register({ id: "dsh-decision-split", kind: "decision-split", title: () => "方案全文" }), …)` 声明页面型 Tab；不写 `patterns`。
3. 在 `sidebar.right.pane.tab` 用 `{ name, key: "dsh-decision-split" }` 注册 body；body 通过注入的 `useTabInfo()` 读 `tab.navigation.params.messageId`，继续用 `useChat(s => s.legacy.nodes)` 按 `messageId` 找消息。
4. 在 `sidebar.right.pane.tab.title` 用同一个 key 注册标题组件，按消息首个标题实时更新 chip（静态 `title()` 只是未命中时的兜底）。
5. 按钮改为 `ctx.sidebarRight.openTab("decision-split", { params: { messageId } })`；同一消息再次点击只聚焦，切换消息复用同一 Tab。收起完全交给 rightbar 自带的 Tab 关闭/「收起右侧边栏」，插件不再自绘关闭按钮，也不再设置宽度。

已知取舍：page 的 `params` 只属于导航、不随布局持久化；刷新后恢复的 Tab 没有 `messageId`，body 显示空状态（旧版的内存态同样不恢复）。按钮文案固定为「在侧栏查看全文」；`ctx.sidebarRight.active()` 不是响应式 hook，不做「收起侧栏」的实时文案同步。

### 0.2.5 验证结果（2026-10-19）

用 headless Chrome + CDP 打开真实 `dsh web` 页面（同一 Session，页面加载的是磁盘上的 0.2.5 bundle），结果：

- 已完成的含文本 assistant 消息尾部出现 1 个「在侧栏查看全文」按钮；
- 点击后 rightbar 打开，`.ddec-side` 位于 `[data-rightbar-col]` 内，markdown 正文 1624 字符，标题与表格均渲染；
- Tab chip 显示消息首个标题「结论」，而不是静态的「方案全文」；
- 再点同一按钮仍只有 1 个 Tab / 1 份正文，没有重复打开；
- 点右侧栏原生「收起右侧边栏」后列宽归 0，再点入口按钮可重新展开；
- 无 `Runtime.exceptionThrown`；唯一的 404 是无关的 `/open-in-app/icon/vscode`。

## 依赖核对明细（0.1.2-rc.1 历史记录）

| 插件依赖 | 状态（0.1.2-rc.1 实测核对） |
|---|---|
| `inject: ["@deepseek-ai/dsh-client-runtime"]` | ❌ 已移除——该包已不存在；`React` 由平台模块种子表提供（`require("react")` 可解析，无需再 `inject`）。package.json 的 `dsh.client` 已改为仅 `platform: "web"` |
| `window.__ModuleLoader__.load({id, factory})`（bundle 加载） | ✅ 仍在——插件已在 `details`/`assistant-actions` 槽注册（occupants 可查），即 bundle 已加载、`apply()` 已执行 |
| `dsh.client` 清单 + `./client` 导出 | ✅ 仍在（`dsh.client.platform: "web"`，宿主按 `/plugins` 提供 bundle；bundle 已生效） |
| `conversation.chat.assistant-actions`（list/session） | ✅ 注册 `{id:"dsh-decision-split", order:20}` 与 harness 自带 `feedback`（order 10）**共存**（Inspect 实测 occupants 二者均 active）。owner 传 `{messageId}`，standardProps 含 `useChat` |
| 消息文本数据源 `useChat(s => s.legacy.nodes)` | ✅ 关键修复：0.1.2-rc.1 起 `useSession(s => s.nodes)` 返回 `SessionSeq[]`（纯数字），不再是 `ConversationNode[]`。改取 chat 目标快照的 `legacy.nodes`（`ConversationNode[]`，含 `{kind:"assistant", seq, messageId, blocks}`），运行时按 seq 命中（match=Y） |
| `details` 槽（single/session，priority 遮蔽） | ✅ 仍在（Inspect 实测：single/session，`registration:[]`、"registering 替换列"；插件 `priority:-1` 已生效——occupants 中 priority -1 为 active） |
| `layout` 服务 `openDetails()/closeDetails()` | ✅ 仍在（Inspect 实测：仅 `toggleSidebar/openDetails/closeDetails` 三个方法）；但**不再暴露 `attachPanels`/`setDetails`**（见下方风险面） |
| `useSession` | ✅ 仍在（Inspect 实测：作为 standardProps 传入槽组件）；但**其 `nodes` 字段语义已变**（见上方数据源一行） |
| `--dsw-*` CSS tokens | ⚠️ 大幅缩减：运行版仅 13 个语义别名 token（Inspect 实测），其中 `--dsw-font-*`、`--dsw-alias-markdown-*`、`--dsw-alias-interactive-*`、`--dsw-alias-state-business-*`、`--dsw-alias-label-caption`、`--dsw-alias-border-l3` 已删除。插件 CSS 已改用现存 token + 字面量字体栈，且插件用到的 `border-l2/bg-base/bg-layer-1/bg-layer-2/label-primary/label-secondary/brand-primary` 当前均在 |

> 本表是 0.1.2-rc.1 的历史核对记录。0.2.x 起 `details` 槽与 `openDetails/closeDetails` 已移除，插件 0.2.5 的当前依赖见上方「0.2.1-rc.2 适配结论」。

> 0.2.0 起移除的依赖：`inputActions.setDraft/submit`（决策回传）、决策段/决策点语义判定代码。

## 已知风险面（升级后重点复查）

- **CSS token 集合**：token 删除/改名会静默丢样式（不报错）——大版本升级后抽查；
- **右侧栏生态竞争**：aionui-panel / dsh-better-sidebar 等接管右侧栏或 rightbar 时，需实测共存；
- **0.2.x rightbar 体系（0.2.1-rc.2 起）**：`details` 槽已删除，右侧栏由 `ui-sidebar-right` 的 `rightbar` / `sidebar.right.pane.tab` 接管；直接注册 `details` 会静默挂起，包装 `layout.openDetails/attachPanels` 是死代码，点击旧 API 会抛 `TypeError`。插件 0.2.5 已改用 `sidebarRightTabs` + `openTab`；升级后仍优先核对 `ctx.sidebarRightTabs` / `ctx.sidebarRight`；
- **turnTail 链竞争（0.2.3 前的真实坑）**：`dsh-client-ui-deliverables` 在 `conversation.chat.turnTail` 用默认 `priority 0` 注册，且**仅对产出文件的消息**返回非 null；链槽按升序取第一个匹配。插件若注册在该链且 priority ≥ 0，在产出文件的消息上会被静默跳过（按钮不渲染）。0.2.3 起改用 `conversation.chat.assistant-actions`（list 槽）与「产物」按钮共存，规避该竞争；
- **assistant-actions 槽契约**：owner 只给 `{messageId}`；仅当 closing assistant 有 durable `messageId` 时该槽才渲染（无 messageId 的合成中断兜底消息不显示按钮），且按 `messageId` 在 `legacy.nodes` 里定位消息；
- **layout 服务形状**：0.1.x 的 `openDetails/closeDetails` 在 0.2.x 已移除（现为 `openRightbar/closeRightbar` 等）；插件 0.2.5 不再调用 `layout`。升级后若再出现“按钮无反应”，先查这组形状。

## 详情栏宽度（0.1.2-rc.1 时的结论）

`ctx.layout` 只暴露 `openDetails()/closeDetails()/toggleSidebar()`；0.1.2-rc.1 实测**不再有** `attachPanels`/`setDetails`，详情栏偏好宽度已是瞬时布局 store 的私有状态（仅用户拖动可改），无公开 setter（`ui-layout` 文档明示"消费方不得把 store 中的详情宽度当作渲染真值"）。

因此插件不再包装 `layout` 来固化 480px，`apply()` 里已删除该逻辑，改用 harness 默认宽度；`openDetails()/closeDetails()` 仍被入口按钮与关闭按钮正常调用。旧规则依赖 `attachPanels` 拦截 + `setDetails(480)`，在 0.1.2-rc.1 会静默回退为默认宽度。

> 0.2.x 起 `openDetails/closeDetails/attachPanels/setDetails` 全部移除，宽度改由 rightbar 的瞬时布局偏好管理，见上方「0.2.1-rc.2 适配结论」。
