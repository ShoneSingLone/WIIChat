const path = require("path");
const handleLibs = require("rollup-plugin-node-resolve");
const handleCommonJS = require("rollup-plugin-commonjs");
const handleStyle = require("rollup-plugin-postcss");
const handleVue = require("rollup-plugin-vue");
const handleJSON = require("rollup-plugin-json");
const inputPath = path.resolve(__dirname, "src/index.js");
const outputPath = path.resolve(__dirname, "dist/main/bunlde.js");
const outputPathCSS = path.resolve(__dirname, "dist/style/bunlde.css");
const NODE_ENV = process.env.NODE_ENV;
/* prod dev */
console.log("NODE_ENV", NODE_ENV, outputPathCSS);
module.exports = {
    input: inputPath,
    output: {
        file: outputPath,
        format: "umd",
        name: "hello"
    },
    plugins: [
        handleVue(),
        /* 依赖库 */
        handleLibs(),
        handleJSON(),
        /* commonjs 引用 */
        handleCommonJS(),
        handleStyle(),
    ],
    external: [""]
};