# 兼容性验证记录

本文件记录 dsh-decision-split 在不同 DSH 版本下的验证结果。每次升级 DSH 后按此清单复核，并更新最新一行。

## 验证清单（30 秒冒烟）

1. agent 消息（含文本）尾部出现「在侧栏查看全文」按钮；
2. 点击 → 右侧详情栏（details 列）独立滚动展示完整 markdown（含表格/代码块/行内 code）；
3. 点击另一条消息的按钮 → 侧栏切换为那条消息；点侧栏右上角 × → 收起；
4. 不再出现决策卡、内嵌输入框、「发送决策」按钮（0.2.0 起已移除）。

## 已验证版本

| DSH 版本 | 插件版本 | 结论 | 日期 | 备注 |
|---|---|---|---|---|
| 0.1.0-rc.8 | 0.1.7 | ✅ 兼容 | 2026-08-21 | 源码逐项核对 + 运行时验证通过（决策卡/决策回传）；首次测试未出现系浏览器缓存，硬刷新后正常 |
| 0.1.2-rc.1 | 0.2.4 | ✅ 兼容 | 2026-09-07 | 源码逐项核对（见明细表）+ 运行时验证：按钮在消息尾部渲染、`useChat` 快照 `legacy.nodes` 按消息匹配命中；0.2.3 起注册于 `conversation.chat.assistant-actions`（list 槽）与「产物」按钮共存；0.2.4 修复 hooks 顺序（`useChat`/`useActiveSeq` 必须早于按数据早退的 `return`） |

## 依赖核对明细

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

> 0.2.0 起移除的依赖：`inputActions.setDraft/submit`（决策回传）、决策段/决策点语义判定代码。

## 已知风险面（升级后重点复查）

- **CSS token 集合**：token 删除/改名会静默丢样式（不报错）——大版本升级后抽查；
- **details 列生态竞争**：aionui-panel / dsh-better-sidebar 接管右侧栏时，侧栏弹出示需实测共存；
- **turnTail 链竞争（0.2.3 前的真实坑）**：`dsh-client-ui-deliverables` 在 `conversation.chat.turnTail` 用默认 `priority 0` 注册，且**仅对产出文件的消息**返回非 null；链槽按升序取第一个匹配。插件若注册在该链且 priority ≥ 0，在产出文件的消息上会被静默跳过（按钮不渲染）。0.2.3 起改用 `conversation.chat.assistant-actions`（list 槽）与「产物」按钮共存，规避该竞争；
- **assistant-actions 槽契约**：owner 只给 `{messageId}`；仅当 closing assistant 有 durable `messageId` 时该槽才渲染（无 messageId 的合成中断兜底消息不显示按钮），且按 `messageId` 在 `legacy.nodes` 里定位消息；
- **layout 服务形状**：`attachPanels`/`setDetails` 在 0.1.2-rc.1 已从 `ctx.layout` 移除（Inspect 实测仅剩 `toggleSidebar/openDetails/closeDetails`），插件不再包装它们，详情栏改用默认宽度；`openDetails()`/`closeDetails()` 仍有效。

## 详情栏宽度（当前版本不再固化）

`ctx.layout` 只暴露 `openDetails()/closeDetails()/toggleSidebar()`；0.1.2-rc.1 实测**不再有** `attachPanels`/`setDetails`，详情栏偏好宽度已是瞬时布局 store 的私有状态（仅用户拖动可改），无公开 setter（`ui-layout` 文档明示"消费方不得把 store 中的详情宽度当作渲染真值"）。

因此插件不再包装 `layout` 来固化 480px，`apply()` 里已删除该逻辑，改用 harness 默认宽度；`openDetails()/closeDetails()` 仍被入口按钮与关闭按钮正常调用。旧规则依赖 `attachPanels` 拦截 + `setDetails(480)`，在 0.1.2-rc.1 会静默回退为默认宽度。
