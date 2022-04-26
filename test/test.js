const {Url} = require("../dist/url.bundle");

const link = "https://kingdata.com/en/nft/723477";

const url = new Url(link, "/:lang/nft/:id(/:type)");
// 修改
url.update({id: 100});
console.log(url.stringify());
url.cd("dashboard");
console.log(url.stringify());
url.cd("../twitter");
console.log(url.stringify());
// 解析 url
const param = url.match();
console.log(param);
console.log(url.parse());
