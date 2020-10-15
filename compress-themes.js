const fs = require("fs");
const compressing = require("compressing");

const args = process.argv.splice(2)[0];
const dirName = args ? args === 'pc' ? 'pingcode' : 'worktile' : 'pingcode';

compressing.zip
    .compressDir(`./lib/ghost/themes/${dirName}`, `${dirName}.zip`)
    .then(() => {
        console.log(`${dirName} 文件夹压缩成功!`);
    })
    .catch((err) => {
        console.log("压缩失败，失败原因：", err);
        return;
    });
