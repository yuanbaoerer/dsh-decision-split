# 兼容性验证记录

本文件记录 dsh-decision-split 在不同 DSH 版本下的验证结果。每次升级 DSH 后按此清单复核，并更新最新一行。

## 验证清单（30 秒冒烟）

1. agent 消息带 `## 决策摘要` 段 → 主窗口出现决策卡（摘要 + 输入框 + 两个按钮）；
2. 点「侧栏查看全文」→ 右侧详情栏（details 列）独立滚动展示完整 markdown（含表格/代码块/行内 code）；
3. 输入决策 → 点「发送决策」→ 消息以 `【决策】…` 前缀回传 agent；
4. 新别名触发（可选）：`## 方案对比` / `## 待确认` 等标题同样出卡。

## 已验证版本

| DSH 版本 | 插件版本 | 结论 | 日期 | 备注 |
|---|---|---|---|---|
| 0.1.0-rc.8 | 0.1.7 | ✅ 兼容 | 2026-08-21 | 源码逐项核对 + 运行时验证通过（决策卡/决策回传）；首次测试未出现系浏览器缓存，硬刷新后正常 |

## rc.8 核对明细（2026-08-21）

| 插件依赖 | rc.8 状态 |
|---|---|
| `inject: ["@deepseek-ai/dsh-client-runtime"]` | ✅ 仍在（`packages/client/web/src/platform.ts` 壳提供 /client 模块） |
| `window.__ModuleLoader__.load`（bundle 加载） | ✅ 仍在（boot.client.spec 使用） |
| `slots` 服务 + `conversation.chat.turnTail`（chain/session） | ✅ 仍在（ui-conversation contract/slots.ts） |
| `details` 槽（single/session，priority 遮蔽） | ✅ 仍在（ui-layout，文档明示 registering 替换列） |
| priority 语义（ascending，低者胜出） | ✅ 未变（ui-slots） |
| `layout` 服务 + `closeDetails()` | ✅ 仍在（ui-layout `ctx.reflect.provide('layout', …)`） |
| `useSession` / `inputActions.setDraft/submit` | ✅ 仍在（session kit / input contract） |
| 28 个 `--dsw-*` CSS tokens | ✅ 全部保留（ui-theme design-platform.css） |
| rc.8 移除的 `dsh-client-web-react` / `dsh-client-schema-form` | ✅ 零引用 |

## 已知风险面（升级后重点复查）

- **CSS token 集合**：token 删除/改名会静默丢样式（不报错）——大版本升级后抽查；
- **details 列生态竞争**：aionui-panel / dsh-better-sidebar 接管右侧栏时，侧栏弹出示需实测共存；
- **session kit 签名**：rc 阶段可能加参数，向后兼容概率高。
