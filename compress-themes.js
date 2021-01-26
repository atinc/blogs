const fs = require("fs");
const path = require('path');
const compressing = require("compressing");

const args = process.argv.splice(2)[0];
const dirName = args ? args === 'pc' ? 'pingcode' : 'worktile' : 'pingcode';

const builtPath = path.join(__dirname, 'built');
const getDate = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    return `${currentDate.getFullYear()}${currentMonth < 10 ? `0${currentMonth}` : currentMonth}${currentDate.getDate()}`;
};
const zipName = `built/${dirName}_${getDate()}.zip`;

if (!fs.existsSync(builtPath)) {
    fs.mkdirSync(builtPath);
}

compressing.zip
    .compressDir(`./lib/ghost/themes/${dirName}`, zipName)
    .then(() => {
        console.log(`${dirName} 文件夹压缩成功!`);
    })
    .catch((err) => {
        console.log("压缩失败，失败原因：", err);
        return;
    });
