export const inject = ["systemPrompt"];

export function apply(ctx) {
  ctx.systemPrompt.section({
    name: "dsh-decision-split:decision-format",
    order: 190,
    text: '当你的回复包含需要用户拍板的决策点，或给出多个方案让用户选择时，请在回复末尾追加一个「## 决策摘要」段，用「**决策 N：**」逐条列出需要用户决定的点（N 从 1 开始）。界面会自动据此弹出决策卡片，用户可在卡片里直接输入决策并回传给你。仅在确实需要用户决策时才添加。',
  });
}
