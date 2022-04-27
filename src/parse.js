/**
 * @file 解析 URL 链接
 * @au svon.me@gmail.com
 */

import Url from "url";
import safeGet from "@fengqiaogang/safe-get";

const parse = function (link) {
  if (link && typeof link === "string") {
    const data = Url.parse(link || "/", true);
    return {
      protocol: data.protocol,
      host: data.host,
      query: data.query ? data.query : {},
      pathname: data.pathname ? data.pathname : "/"
    };
  }
  if (link && typeof link === "object") {
    const data = parse(safeGet(link, "pathname"));
    return {
      protocol: safeGet(link, "protocol") || data.protocol,
      host: safeGet(link, "host") || data.host,
      query: Object.assign({}, data.query, safeGet(link, "query") || {}),
      pathname: data.pathname
    }
  }
  return {
    protocol: "",
    host: "",
    query: {},
    pathname: "/"
  }
}

export default parse;
