
import { Url } from "./index";

const link = "https://kingdata.com/nft/723477/nft?lang=en";

const url = new Url(link);
// 设置中英文
url.setLanguage("cn");
// 设置路径
url.setPathName("/:lang/dapp/:id", { id: 100, lang: "en", a: 1, b: 2 });
console.log(url.stringify());
url.cd("dashboard");
console.log(url.stringify());
url.cd("../twitter");
console.log(url.stringify());
// 解析 url
const param = url.match("/:lang/dapp/:id");
console.log(param);
