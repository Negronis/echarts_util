import {
    format} from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
let util = {
    // 编辑器配置
    cmOptions: {
        autorefresh: true,
        tabSize: 4, //tab空格宽度
        mode: "text/javascript",
        line: true,
        viewportMargin: Infinity, //处理高度自适应时搭配使用
        highlightDifferences: true,
        spellcheck: true,
        autofocus: true,
        indentWithTab: true,
        smartIndent: true,
        styleActiveLine: true, // 设置光标所在行高亮
        showCursorWhenSelecting: true,
        lineNumbers: true, // 显示行号
        // matchBrackets: true, //自动补全括号
        autoCloseBrackets: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        theme: "eclipse",
    },
    formattedCode(code, head) {
        return format(head ? `${head}=${JSON.stringify(code)}` : `var a=${JSON.stringify(code)}`, {
            parser: "babel",
            plugins: [parserBabel],
            // 你可以在这里添加其他Prettier配置选项
        })
    }
}
export default util