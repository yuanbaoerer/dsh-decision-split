window.__ModuleLoader__.load({
  id: "dsh-decision-split",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    var React = require("react");

    var inject = ["slots", "layout"];

    var css = [
      ".ddec-side{border-left:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);flex-direction:column;min-width:0;height:100%;display:flex}",
      ".ddec-side-head{border-bottom:1px solid var(--dsw-alias-border-l2);justify-content:space-between;align-items:center;gap:8px;padding:14px 12px 12px;display:flex}",
      ".ddec-side-title{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;font-size:14px;font-weight:500;line-height:20px;overflow:hidden}",
      ".ddec-side-close{width:28px;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:transparent;border:none;border-radius:999px;flex:none;place-items:center;display:grid}",
      ".ddec-side-close:hover{background:var(--dsw-alias-interactive-bg-hover)}",
      ".ddec-side-body{flex:1;min-height:0;padding:12px 16px;overflow-y:auto}",
      ".ddec-side-empty{color:var(--dsw-alias-label-tertiary);padding:8px 0;font-size:13px;line-height:20px}",
      ".ddec-open{display:inline-flex;align-items:center;justify-content:center;gap:4px;color:var(--dsw-alias-label-secondary);background:transparent;border:1px solid var(--dsw-alias-border-l2);border-radius:14px;cursor:pointer;font-size:12px;line-height:18px;padding:0 10px;height:28px;font-family:var(--dsw-font-family);margin-bottom:6px}",
      ".ddec-open:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}",
      ".ddec-md{min-width:0;overflow-wrap:anywhere;font:var(--dsw-font-markdown-base);color:var(--dsw-alias-label-primary)}",
      ".ddec-md strong{font-weight:600}",
      ".ddec-md h1{font:var(--dsw-font-markdown-h1);margin:32px 0 16px}",
      ".ddec-md h2{font:var(--dsw-font-markdown-h2);margin:32px 0 16px}",
      ".ddec-md h3{font:var(--dsw-font-markdown-h3);margin:32px 0 16px}",
      ".ddec-md h4{font:var(--dsw-font-markdown-h4);margin:16px 0}",
      ".ddec-md h5,.ddec-md h6{font:var(--dsw-font-markdown-base-strong);margin:16px 0}",
      ".ddec-md p{margin:16px 0}",
      ".ddec-md a{color:var(--dsw-alias-state-business-primary);text-decoration:none}",
      ".ddec-md a:hover,.ddec-md a:focus{text-decoration:underline var(--dsw-alias-state-business-primary)}",
      ".ddec-md a:focus-visible{outline:none;box-shadow:0 0 0 2px var(--dsw-alias-state-business-primary)}",
      ".ddec-md ul,.ddec-md ol{margin:16px 0;padding-left:18px}",
      ".ddec-md li:not(:first-child){margin-top:6px}",
      ".ddec-md li>p{margin:8px 0}",
      ".ddec-md hr{display:block;border:none;height:1px;margin:32px 0;background:var(--dsw-alias-border-l2)}",
      ".ddec-md blockquote{border-left:2px solid var(--dsw-alias-label-caption);margin:16px 0 0;padding-left:14px}",
      ".ddec-md pre{margin:16px 0;font:var(--dsw-font-markdown-code-block);color:var(--dsw-alias-label-primary);background:var(--dsw-alias-markdown-code-block);border-radius:12px;padding:12px 16px;overflow:auto;white-space:pre-wrap;word-break:break-word}",
      ".ddec-md pre code{font:inherit;background:transparent;padding:0}",
      ".ddec-md :not(pre)>code{display:inline-flex;align-items:center;font:var(--dsw-font-markdown-code);font-family:var(--ds-font-family-code);font-size:.875em;background-color:var(--dsw-alias-markdown-inline-code);border-radius:6px;padding:0 5px}",
      ".ddec-tablescroll{max-width:100%;overflow-x:auto;overscroll-behavior-x:contain}",
      ".ddec-md table{border-collapse:collapse;width:max-content;max-width:max-content}",
      ".ddec-md th{text-align:start;padding:10px 16px;border-bottom:1px solid var(--dsw-alias-border-l3);border-top:none;font:var(--dsw-font-markdown-table-head);max-width:min(30vw,320px);min-width:100px}",
      ".ddec-md td{padding:10px 16px;border-bottom:1px solid var(--dsw-alias-border-l2);font:var(--dsw-font-markdown-table);max-width:min(30vw,320px);min-width:100px}",
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
      md = md.replace(/\r\n?/g, "\n");
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
      return out.join("");
    }

    function apply(ctx) {
      var slots = ctx.slots;
      var layout = ctx.layout;

      // 详情栏宽度适配（固化在本插件内，无需改动 harness）：
      // `ctx.layout` 只暴露 open/close/toggle，打开时默认 360px（harness 硬编码）。
      // 插件包装 openDetails：面板动作由 AppFrame 挂载时经 attachPanels 送达，
      // 拿到后在其基础上把详情栏设为 480px（在 harness clamp [300,520] 内，
      // 窄视口让步链由 store 自动处理，用户拖拽值不受影响）。
      // harness 接口若变化导致缺失，则静默回退为默认宽度。
      var DDEC_DETAILS_WIDTH = 480;
      var ddecWired = null;
      if (typeof layout === "object" && layout !== null) {
        var ddecAttach = typeof layout.attachPanels === "function" ? layout.attachPanels.bind(layout) : null;
        var ddecOpen = typeof layout.openDetails === "function" ? layout.openDetails.bind(layout) : null;
        if (ddecAttach !== null && ddecOpen !== null) {
          layout.attachPanels = function (actions) {
            ddecWired = actions;
            ddecAttach(actions);
          };
          layout.openDetails = function () {
            ddecOpen();
            if (ddecWired !== null && typeof ddecWired.setDetails === "function") {
              ddecWired.setDetails(DDEC_DETAILS_WIDTH);
            }
          };
        }
      }

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

      function textAt(useSession, seq) {
        return useSession(function (s) {
          if (s === undefined || s === null || !Array.isArray(s.nodes)) return "";
          for (var i = 0; i < s.nodes.length; i++) {
            var n = s.nodes[i];
            if (n && n.kind === "assistant" && n.seq === seq) return textOf(n);
          }
          return "";
        });
      }

      // 常驻入口：每条含文本的 agent 消息尾部显示「在侧栏查看全文」按钮。
      // 首次点击打开右侧详情栏展示该条消息的完整 markdown；侧栏正在展示
      // 该条消息时再次点击则收回。点击其它消息的按钮会切换展示目标。
      function OpenSidebarButton(props) {
        var text = textAt(props.useSession, props.seq);
        if (text.trim() === "") return null;
        var shown = useActiveSeq() === props.seq;
        function toggle() {
          if (activeSeq === props.seq) {
            setActiveSeq(null);
            if (layout) layout.closeDetails();
          } else {
            setActiveSeq(props.seq);
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
        var found = props.useSession(function (s) {
          if (seq === null || s === undefined || s === null || !Array.isArray(s.nodes)) return false;
          for (var i = 0; i < s.nodes.length; i++) {
            var n = s.nodes[i];
            if (n && n.kind === "assistant" && n.seq === seq) return true;
          }
          return false;
        });
        var text = textAt(props.useSession, seq);
        var title = titleOf(text);
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
            seq === null || !found
              ? React.createElement("div", { className: "ddec-side-empty" }, "点击某条消息下方的「在侧栏查看全文」，完整内容会显示在这里。")
              : React.createElement("div", { className: "ddec-md", dangerouslySetInnerHTML: { __html: renderMarkdown(text) } })
          )
        );
      }

      slots.inject("conversation.chat.turnTail", function () {
        return slots.register(
          { name: "conversation.chat.turnTail", priority: 1, select: function (owner) { return owner.seq; } },
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
