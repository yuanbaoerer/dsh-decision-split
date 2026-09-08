window.__ModuleLoader__.load({
  id: "dsh-decision-split",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    var React = require("react");

    var inject = ["slots", "layout"];

    // 字体栈：0.1.2-rc.1 起主题不再发布 --dsw-font-* / --ds-font-family-*
    // 系列 token（Theme Inspect 仅剩 13 个语义别名 token）。字体改用字面量栈。
    var SANS = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"PingFang SC","Microsoft YaHei",sans-serif';
    var MONO = 'ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono","Courier New",monospace';

    // 0.1.2-rc.1 的 alias token 集被大幅缩减，插件的 markdown/内侧 token
    // 已删除。此处只使用当前仍发布的 --dsw-alias-* token；缺失的语义
    // （tertiary、interactive-bg-hover、state-business、markdown-code、
    //  border-l3、label-caption、font 系列）映射到仍存在的最接近 token 或字面量。
    var css = [
      ".ddec-side{border-left:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);flex-direction:column;min-width:0;height:100%;display:flex}",
      ".ddec-side-head{border-bottom:1px solid var(--dsw-alias-border-l2);justify-content:space-between;align-items:center;gap:8px;padding:14px 12px 12px;display:flex}",
      ".ddec-side-title{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;font-size:14px;font-weight:500;line-height:20px;overflow:hidden}",
      ".ddec-side-close{width:28px;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:transparent;border:none;border-radius:999px;flex:none;place-items:center;display:grid}",
      ".ddec-side-close:hover{background:var(--dsw-alias-bg-layer-1)}",
      ".ddec-side-body{flex:1;min-height:0;padding:12px 16px;overflow-y:auto}",
      ".ddec-side-empty{color:var(--dsw-alias-label-secondary);padding:8px 0;font-size:13px;line-height:20px}",
      ".ddec-open{display:inline-flex;align-items:center;justify-content:center;gap:4px;color:var(--dsw-alias-label-secondary);background:transparent;border:1px solid var(--dsw-alias-border-l2);border-radius:14px;cursor:pointer;font-size:12px;line-height:18px;padding:0 10px;height:28px;font-family:" + SANS + ";margin-bottom:6px}",
      ".ddec-open:hover{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}",
      ".ddec-md{min-width:0;overflow-wrap:anywhere;font-family:" + SANS + ";font-size:14px;line-height:22px;color:var(--dsw-alias-label-primary)}",
      ".ddec-md strong{font-weight:600}",
      ".ddec-md h1{font-size:24px;line-height:32px;font-weight:600;margin:32px 0 16px}",
      ".ddec-md h2{font-size:20px;line-height:28px;font-weight:600;margin:32px 0 16px}",
      ".ddec-md h3{font-size:17px;line-height:25px;font-weight:600;margin:32px 0 16px}",
      ".ddec-md h4{font-size:15px;line-height:22px;font-weight:600;margin:16px 0}",
      ".ddec-md h5,.ddec-md h6{font-size:14px;line-height:22px;font-weight:600;margin:16px 0}",
      ".ddec-md p{margin:16px 0}",
      ".ddec-md a{color:var(--dsw-alias-brand-primary);text-decoration:none}",
      ".ddec-md a:hover,.ddec-md a:focus{text-decoration:underline var(--dsw-alias-brand-primary)}",
      ".ddec-md a:focus-visible{outline:none;box-shadow:0 0 0 2px var(--dsw-alias-brand-primary)}",
      ".ddec-md ul,.ddec-md ol{margin:16px 0;padding-left:18px}",
      ".ddec-md li:not(:first-child){margin-top:6px}",
      ".ddec-md li>p{margin:8px 0}",
      ".ddec-md hr{display:block;border:none;height:1px;margin:32px 0;background:var(--dsw-alias-border-l2)}",
      ".ddec-md blockquote{border-left:2px solid var(--dsw-alias-label-secondary);margin:16px 0 0;padding-left:14px}",
      ".ddec-md pre{margin:16px 0;font-family:" + MONO + ";font-size:13px;line-height:20px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);border-radius:12px;padding:12px 16px;overflow:auto;white-space:pre-wrap;word-break:break-word}",
      ".ddec-md pre code{font:inherit;background:transparent;padding:0}",
      ".ddec-md :not(pre)>code{display:inline-flex;align-items:center;font-family:" + MONO + ";font-size:.875em;background-color:var(--dsw-alias-bg-layer-1);border-radius:6px;padding:0 5px}",
      ".ddec-tablescroll{max-width:100%;overflow-x:auto;overscroll-behavior-x:contain}",
      ".ddec-md table{border-collapse:collapse;width:max-content;max-width:max-content}",
      ".ddec-md th{text-align:start;padding:10px 16px;border-bottom:1px solid var(--dsw-alias-border-l2);border-top:none;font-family:" + SANS + ";font-size:13px;line-height:20px;font-weight:600;max-width:min(30vw,320px);min-width:100px}",
      ".ddec-md td{padding:10px 16px;border-bottom:1px solid var(--dsw-alias-border-l2);font-family:" + SANS + ";font-size:13px;line-height:20px;max-width:min(30vw,320px);min-width:100px}",
      ".ddec-md table code{font-size:13px}",
      ".ddec-md th:first-child,.ddec-md td:first-child{padding-left:0}",
      ".ddec-md td:last-child{padding-right:0}",
      ".ddec-md>*:first-child{margin-top:0}",
      ".ddec-md>*:last-child{margin-bottom:0}"
    ].join("\n");
    var cssKey = "dsh-decision-split/style.css";
    if (!document.querySelector("style[data-plugin-css=" + JSON.stringify(cssKey) + "]")) {
      var styleEl = document.createElement("style");
      styleEl.dataset.plugin = "dsh-decision-split";
      styleEl.dataset.pluginCss = cssKey;
      styleEl.textContent = css;
      document.head.appendChild(styleEl);
    }

    function textOf(node) {
      if (node === undefined || node === null || !Array.isArray(node.blocks)) return "";
      var out = "";
      node.blocks.forEach(function (b) {
        if (b && b.kind === "text" && typeof b.text === "string") out += b.text + "\n";
      });
      return out;
    }

    function titleOf(text) {
      var lines = text.replace(/\r\n?/g, "\n").split("\n");
      for (var i = 0; i < lines.length; i++) {
        var m = lines[i].match(/^(#{1,6})\s+(.*)$/);
        if (m && m[2].trim() !== "") return m[2].trim();
      }
      for (var i = 0; i < lines.length; i++) {
        var t = lines[i].trim();
        if (t !== "" && !/^#{1,6}(\s|$)/.test(t)) return t.length > 40 ? t.slice(0, 40) + "…" : t;
      }
      return "方案全文";
    }

    function escapeHtml(s) {
      return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    function renderInline(s) {
      var t = escapeHtml(s);
      var codes = [];
      t = t.replace(/`([^`]+)`/g, function (m, c) {
        var idx = codes.length;
        codes.push("<code>" + c + "</code>");
        return "\u0000C" + idx + "\u0000";
      });
      t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      t = t.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
      t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (whole, label, url) {
        var u = url.trim();
        if (!/^https?:\/\//i.test(u) && !/^mailto:/i.test(u)) return "[" + label + "](" + u + ")";
        return '<a href="' + u + '" target="_blank" rel="noopener noreferrer">' + label + "</a>";
      });
      t = t.replace(/\u0000C(\d+)\u0000/g, function (m, i) { return codes[Number(i)]; });
      return t;
    }

    function splitRow(row) {
      var r = row.trim();
      if (r.charAt(0) === "|") r = r.slice(1);
      if (r.charAt(r.length - 1) === "|") r = r.slice(0, -1);
      return r.split("|").map(function (c) { return c.trim(); });
    }

    function renderMarkdown(md) {
      if (typeof md !== "string") return "";
      md = md.replace(/\r\n?/g, "\n").replace(/\u0000/g, "");
      var fences = [];
      var src = md.replace(/```[^\n]*\n([\s\S]*?)```/g, function (whole, code) {
        var idx = fences.length;
        fences.push("<pre><code>" + escapeHtml(code.replace(/\n$/, "")) + "</code></pre>");
        return "\u0000F" + idx + "\u0000";
      });
      var lines = src.split("\n");
      var out = [];
      var para = [];
      var inList = false;
      var listTag = "";
      var inQuote = false;

      function flushPara() { if (para.length > 0) { out.push("<p>" + para.map(renderInline).join(" ") + "</p>"); para = []; } }
      function closeList() { if (inList) { out.push("</" + listTag + ">"); inList = false; listTag = ""; } }
      function closeQuote() { if (inQuote) { out.push("</blockquote>"); inQuote = false; } }

      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var fm = line.match(/^\u0000F(\d+)\u0000$/);
        if (fm) { flushPara(); closeList(); closeQuote(); out.push(fences[Number(fm[1])]); continue; }
        var t = line.trim();
        if (t === "") { flushPara(); closeList(); closeQuote(); continue; }
        var h = line.match(/^(#{1,6})\s+(.*)$/);
        if (h) { flushPara(); closeList(); closeQuote(); var lv = h[1].length; out.push("<h" + lv + ">" + renderInline(h[2].trim()) + "</h" + lv + ">"); continue; }
        if (/^(-{3,}|\*{3,}|_{3,})$/.test(t)) { flushPara(); closeList(); closeQuote(); out.push("<hr/>"); continue; }
        var q = line.match(/^>\s?(.*)$/);
        if (q) { flushPara(); closeList(); if (!inQuote) { out.push("<blockquote>"); inQuote = true; } out.push("<p>" + renderInline(q[1]) + "</p>"); continue; }
        if (/^\|.*\|$/.test(t) && i + 1 < lines.length && /^\|?[\s:\-|]+\|?$/.test(lines[i + 1].trim()) && lines[i + 1].indexOf("-") !== -1) {
          flushPara(); closeList(); closeQuote();
          var head = splitRow(t);
          var body = [];
          i += 2;
          for (; i < lines.length; i++) {
            var row = lines[i].trim();
            if (row === "" || row.charAt(0) !== "|") { i--; break; }
            body.push(splitRow(row));
          }
          var th = "<tr>" + head.map(function (c) { return "<th>" + renderInline(c) + "</th>"; }).join("") + "</tr>";
          var tb = body.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + renderInline(c) + "</td>"; }).join("") + "</tr>"; }).join("");
          out.push('<div class="ddec-tablescroll"><table>' + th + tb + "</table></div>");
          continue;
        }
        var ul = line.match(/^\s*[-*+]\s+(.*)$/);
        if (ul) { flushPara(); closeQuote(); if (!inList || listTag !== "ul") { closeList(); out.push("<ul>"); inList = true; listTag = "ul"; } out.push("<li>" + renderInline(ul[1]) + "</li>"); continue; }
        var ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
        if (ol) { flushPara(); closeQuote(); if (!inList || listTag !== "ol") { closeList(); out.push("<ol>"); inList = true; listTag = "ol"; } out.push("<li>" + renderInline(ol[1]) + "</li>"); continue; }
        closeList(); closeQuote();
        para.push(t);
      }
      flushPara(); closeList(); closeQuote();
      // 清理任何残留占位符（例如行内 ```code``` 未成行、未还原的 \u0000F/\u0000C）。
      return out.join("").replace(/\u0000[CF]\d+\u0000/g, "");
    }

    function apply(ctx) {
      var slots = ctx.slots;
      var layout = ctx.layout;

      // 详情栏宽度：0.1.2-rc.1 起 `ctx.layout` 不再暴露 attachPanels / setDetails，
      // 详情栏偏好宽度成为瞬时布局 store 的私有状态（用户拖动），无公开 setter。
      // 插件不再固化 480px，改用默认宽度；openDetails()/closeDetails() 仍有效。
      var activeSeq = null;
      var listeners = new Set();
      function setActiveSeq(seq) { activeSeq = seq; listeners.forEach(function (l) { l(); }); }
      function useActiveSeq() {
        var st = React.useState(activeSeq);
        var val = st[0];
        var setVal = st[1];
        React.useEffect(function () {
          var l = function () { setVal(activeSeq); };
          listeners.add(l);
          return function () { listeners.delete(l); };
        }, []);
        return val;
      }

      // 数据源：0.1.2-rc.1 起 `useSession(s => s.nodes)` 返回 `SessionSeq[]`（纯数字），
      // 不再是 `ConversationNode[]`。改用 chat 目标快照的 `legacy.nodes` 兼容切片
      // （仍是 `{ kind:"assistant", seq, messageId, blocks }` 的 `ConversationNode[]`），
      // 通过槽 standardProps 里的 `useChat` 读取。
      //
      // `useChat` 是 hook：必须在组件顶层无条件调用，且所有 hook 调用都要早于任何
      // 按数据早退的 `return`，否则同一组件在渲染间 hook 数量变化会触发 React
      // "Rendered more hooks than during the previous render" 报错。
      function useNodes(useChat) {
        return useChat(function (s) {
          return (s && s.legacy && Array.isArray(s.legacy.nodes)) ? s.legacy.nodes : [];
        });
      }
      function findAssistant(nodes, match) {
        for (var i = 0; i < nodes.length; i++) {
          var n = nodes[i];
          if (n && n.kind === "assistant" && match(n)) return n;
        }
        return undefined;
      }

      // 常驻入口：每条含文本的 agent 消息尾部显示「在侧栏查看全文」按钮。
      // 首次点击打开右侧详情栏展示该条消息的完整 markdown；侧栏正在展示
      // 该条消息时再次点击则收回。点击其它消息的按钮会切换展示目标。
      // 注册在 conversation.chat.assistant-actions（list 槽，可多并存），与
      // harness 自带的「产物/反馈」按钮共存、不抢占 turnTail 链（产物插件在
      // turnTail 用默认 priority 0 抢占，旧 priority 1 会被跳过）。
      // owner 只给 messageId，据此在 legacy.nodes 里定位该 assistant 节点。

      function OpenSidebarButton(props) {
        var nodes = useNodes(props.useChat);
        var node = findAssistant(nodes, function (n) { return n.messageId === props.messageId; });
        var seq = node === undefined ? null : node.seq;
        var text = node === undefined ? "" : textOf(node);
        var active = useActiveSeq();
        var shown = seq !== null && active === seq;
        if (node === undefined || text.trim() === "") return null;
        function toggle() {
          if (activeSeq === seq) {
            setActiveSeq(null);
            if (layout) layout.closeDetails();
          } else {
            setActiveSeq(seq);
            if (layout) layout.openDetails();
          }
        }
        return React.createElement("button", {
          type: "button",
          className: "ddec-open",
          "aria-expanded": shown || undefined,
          onClick: toggle
        }, shown ? "收起侧栏" : "在侧栏查看全文");
      }

      function SidePanel(props) {
        var seq = useActiveSeq();
        var nodes = useNodes(props.useChat);
        var node = seq === null ? undefined : findAssistant(nodes, function (n) { return n.seq === seq; });
        var text = node === undefined ? "" : textOf(node);
        var title = node === undefined ? "详情" : titleOf(text);
        function close() {
          setActiveSeq(null);
          if (layout) layout.closeDetails();
        }

        return React.createElement("div", { className: "ddec-side" },
          React.createElement("div", { className: "ddec-side-head" },
            React.createElement("span", { className: "ddec-side-title", title: title }, title),
            React.createElement("button", { type: "button", className: "ddec-side-close", "aria-label": "关闭", onClick: close },
              React.createElement("svg", { viewBox: "0 0 16 16", width: "14", height: "14", "aria-hidden": true },
                React.createElement("path", { d: "M4 4l8 8M12 4l-8 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", fill: "none" })
              )
            )
          ),
          React.createElement("div", { className: "ddec-side-body" },
            node === undefined
              ? React.createElement("div", { className: "ddec-side-empty" }, "点击某条消息下方的「在侧栏查看全文」，完整内容会显示在这里。")
              : React.createElement("div", { className: "ddec-md", dangerouslySetInnerHTML: { __html: renderMarkdown(text) } })
          )
        );
      }

      slots.inject("conversation.chat.assistant-actions", function () {
        return slots.register(
          { name: "conversation.chat.assistant-actions", id: "dsh-decision-split", order: 20, priority: 0 },
          OpenSidebarButton
        );
      });
      slots.inject("details", function () {
        return slots.register({ name: "details", priority: -1 }, SidePanel);
      });
    }

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  }
});
