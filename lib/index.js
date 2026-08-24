export const inject = ["systemPrompt"];

export function apply(ctx) {
  ctx.systemPrompt.section({
    name: "dsh-decision-split:decision-format",
    order: 190,
    text: '当你的回复需要用户就「多个决策点」或「多个可选方案」逐一作出选择时，请在回复末尾追加一个「## 决策摘要」段，用「**决策 N：**」（或「**方案 N：**」，N 从 1 开始）逐条列出每个待决定的点或方案。界面会自动据此弹出决策卡片，用户可在卡片里直接输入决策并回传给你。仅当确实存在需要用户拍板的多个决策点或多个备选方案时才添加；普通说明、无需用户决策的回复不要添加。',
  });
}
