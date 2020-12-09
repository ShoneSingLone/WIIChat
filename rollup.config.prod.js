const path = require("path");
const inputPath = path.resolve(__dirname, "src/index.js");
const outputPathUMD = path.resolve(__dirname, "dist/main/bunlde.js");
const outputPath = path.resolve(__dirname, "dist/main/bunlde.js");

module.exports = {
    input: inputPath,
    output: [
        {
            file: outputPathUMD,
            format: "umd",
            name: "hello"
        },{
            file: outputPath,
            format: "es",
            name: "hello"
        }
    ]
};