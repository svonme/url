/**
 * @file 解析 URL 链接
 * @au svon.me@gmail.com
 */

import Url from "url";

const parse = function (link) {
  const data = Url.parse(link || "/", true);
  return {
    protocol: data.protocol,
    host: data.host,
    query: data.query ? data.query : {},
    pathname: data.pathname ? data.pathname : "/"
  };
}

export default parse;
