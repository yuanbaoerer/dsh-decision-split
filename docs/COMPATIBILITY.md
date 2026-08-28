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

> 0.2.0 简化版（仅侧边栏 + 常驻入口）尚未在此表补录新版本行，待发布后按上方清单复核。

## 依赖核对明细

| 插件依赖 | 状态 |
|---|---|
| `inject: ["@deepseek-ai/dsh-client-runtime"]` | ✅ 仍在（`packages/client/web/src/platform.ts` 壳提供 /client 模块） |
| `window.__ModuleLoader__.load`（bundle 加载） | ✅ 仍在 |
| `slots` 服务 + `conversation.chat.turnTail`（chain/session） | ✅ 仍在（ui-conversation contract/slots.ts） |
| `details` 槽（single/session，priority 遮蔽） | ✅ 仍在（ui-layout，文档明示 registering 替换列） |
| priority 语义（ascending，低者胜出） | ✅ 未变（ui-slots） |
| `layout` 服务 + `openDetails()/closeDetails()` | ✅ 仍在（ui-layout `ctx.reflect.provide('layout', …)`） |
| `useSession` | ✅ 仍在（session kit） |
| `--dsw-*` CSS tokens | ✅ 保留（ui-theme design-platform.css） |

> 0.2.0 起移除的依赖：`inputActions.setDraft/submit`（决策回传）、决策段/决策点语义判定代码。

## 已知风险面（升级后重点复查）

- **CSS token 集合**：token 删除/改名会静默丢样式（不报错）——大版本升级后抽查；
- **details 列生态竞争**：aionui-panel / dsh-better-sidebar 接管右侧栏时，侧栏弹出示需实测共存；
- **turnTail 槽契约**：rc 阶段 owner/select 语义可能微调，升级后按清单第 1 条复核；
- **layout 服务形状**：插件包装 `layout.openDetails`/`attachPanels` 以固化详情栏默认宽度 480px，若 harness 把这两个方法改名/移除，插件静默回退为默认 360px（新增代码有 typeof 守卫，不会报错），仅宽度不再变大。

## 详情栏默认宽度（固化于插件内，harness 零改动）

`ctx.layout` 只暴露 open/close/toggle，打开默认 360px 是 harness 硬编码，无 API 可设。插件的做法（`lib/client.js` apply 内）：

1. `attachPanels` 是 AppFrame 挂载时送达面板动作的钩子（`setDetails/openDetails/closeDetails/…`），插件在其上挂一层拦截记录 `actions`；
2. 插件把 `layout.openDetails` 包装为：先调用原 open，再 `actions.setDetails(480)`（harness clamp [300,520] 内）；用户后续拖拽写入的是用户宽度，包装不干预；
3. 窄视口沿用 harness 让步链：详情栏按 480 偏好参与求解（<1400px 视口自动让步到 `视口-侧栏-640`，从不窄于 360；<1220px 时自动关闭逻辑不变）；
4. 退化安全：`attachPanels`/`openDetails`/`setDetails` 任一缺失则不包装，行为等于升级前默认。

> 已还原早前对 harness `dsh-client-ui-layout` 的本地 360→480 改动（含注释），当前 harness 为上游原样。
