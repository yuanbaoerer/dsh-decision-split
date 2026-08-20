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
      ".ddec-card{border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);border-radius:12px;padding:12px 16px;margin:8px 0}",
      ".ddec-card-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px}",
      ".ddec-card-title{color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:500;line-height:18px}",
      ".ddec-summary{max-height:340px;overflow:auto;margin-bottom:10px}",
      ".ddec-md.ddec-empty-text{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:20px}",
      ".ddec-textarea{width:100%;min-height:72px;resize:vertical;box-sizing:border-box;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:8px 12px;font-family:var(--dsw-font-family);font-size:14px;line-height:22px}",
      ".ddec-textarea::placeholder{color:var(--dsw-alias-label-tertiary)}",
      ".ddec-textarea:focus{outline:none;border-color:var(--dsw-alias-state-business-primary)}",
      ".ddec-foot{display:flex;justify-content:flex-end;margin-top:10px}",
      ".ddec-btn{display:inline-flex;align-items:center;justify-content:center;gap:4px;border:none;border-radius:14px;cursor:pointer;font-size:12px;line-height:18px;padding:0 10px;height:28px;font-family:var(--dsw-font-family)}",
      ".ddec-btn-primary{background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground)}",
      ".ddec-btn-primary:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover)}",
      ".ddec-btn-ghost{background:transparent;color:var(--dsw-alias-label-secondary);border:1px solid var(--dsw-alias-border-l2)}",
      ".ddec-btn-ghost:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}",
      ".ddec-btn:disabled{cursor:not-allowed;opacity:.4}",
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

    var MARKER = /^(#{1,6})\s+(决策摘要|决策要点|待决策清单|决策清单|决策事项|方案对比|方案选择|需要决策|待决策|待确认|待拍板|请你决定|请拍板|决策项|决策点|Decision\s+Summary|Decision\s+Points|Decision\s+Required|Decision\s+Needed|Please\s+Decide|Please\s+Choose|Need\s+Your\s+Decision|Options|Choices)[：:]?\s*$/im;

    function textOf(node) {
      if (node === undefined || node === null || !Array.isArray(node.blocks)) return "";
      var out = "";
      node.blocks.forEach(function (b) {
        if (b && b.kind === "text" && typeof b.text === "string") out += b.text + "\n";
      });
      return out;
    }

    function summaryOf(text) {
      var m = text.match(MARKER);
      if (m === null) return null;
      var level = m[1].length;
      var lines = text.slice(m.index).split("\n");
      var kept = [];
      for (var i = 1; i < lines.length; i++) {
        var hh = lines[i].match(/^(#{1,6})\s/);
        if (hh && hh[1].length <= level) break;
        kept.push(lines[i]);
      }
      return kept.join("\n").trim();
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

      function DecisionCard(props) {
        var seq = props.seq;
        var text = props.useSession(function (s) {
          if (s === undefined || s === null || !Array.isArray(s.nodes)) return "";
          for (var i = 0; i < s.nodes.length; i++) {
            var n = s.nodes[i];
            if (n && n.kind === "assistant" && n.seq === seq) return textOf(n);
          }
          return "";
        });
        var summary = summaryOf(text);
        var st = React.useState("");
        var draft = st[0];
        var setDraft = st[1];
        if (summary === null) return null;

        function send() {
          var body = draft.trim();
          if (body === "") return;
          if (props.inputActions) {
            props.inputActions.setDraft("【决策】\n" + body);
            props.inputActions.submit();
          }
          setDraft("");
        }
        function openSide() {
          setActiveSeq(seq);
          if (layout) layout.openDetails();
        }

        return React.createElement("div", { className: "ddec-card" },
          React.createElement("div", { className: "ddec-card-head" },
            React.createElement("span", { className: "ddec-card-title" }, "决策摘要"),
            React.createElement("button", { type: "button", className: "ddec-btn ddec-btn-ghost", onClick: openSide }, "侧栏查看全文")
          ),
          summary === ""
            ? React.createElement("div", { className: "ddec-md ddec-summary ddec-empty-text" }, "（该段暂未填写具体决策点）")
            : React.createElement("div", { className: "ddec-md ddec-summary", dangerouslySetInnerHTML: { __html: renderMarkdown(summary) } }),
          React.createElement("textarea", {
            className: "ddec-textarea",
            placeholder: "在此写下你的决策，点“发送决策”发给 agent",
            value: draft,
            onChange: function (e) { setDraft(e.target.value); }
          }),
          React.createElement("div", { className: "ddec-foot" },
            React.createElement("button", { type: "button", className: "ddec-btn ddec-btn-primary", onClick: send }, "发送决策")
          )
        );
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
        var text = props.useSession(function (s) {
          if (seq === null || s === undefined || s === null || !Array.isArray(s.nodes)) return "";
          for (var i = 0; i < s.nodes.length; i++) {
            var n = s.nodes[i];
            if (n && n.kind === "assistant" && n.seq === seq) return textOf(n);
          }
          return "";
        });
        var title = titleOf(text);
        function close() { if (layout) layout.closeDetails(); }

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
              ? React.createElement("div", { className: "ddec-side-empty" }, "点击某条方案消息下方的「侧栏查看全文」，完整内容会显示在这里。")
              : React.createElement("div", { className: "ddec-md", dangerouslySetInnerHTML: { __html: renderMarkdown(text) } })
          )
        );
      }

      slots.inject("conversation.chat.turnTail", function () {
        return slots.register(
          { name: "conversation.chat.turnTail", priority: 1, select: function (owner) { return owner.seq; } },
          DecisionCard
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
