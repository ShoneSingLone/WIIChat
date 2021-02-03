const path = require("path");
const inputPath = path.resolve(__dirname, "src/index.js");
const outputPath = path.resolve(__dirname, "dist/main/bunlde.js");

module.exports = {
    input: inputPath,
    output:{
        file:outputPath,
        format:"umd",
        name:"hello"
    }
};