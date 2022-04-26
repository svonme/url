/**
 * @file URL
 * @author svon.me@gmail.com
 */

import path from "path";
import parse from "./parse";
import UrlPattern from "url-pattern";
import safeGet from "@fengqiaogang/safe-get";
import * as _ from "./util";

export class Url {
  // url 对象
  link;
  // url 解析模版
  pattern;
  // 中英文键名
  languageName = "lang";

  constructor(link = "/", pattern) {
    const data = parse(link);
    this.link = data;
    this.pattern = pattern ? pattern : data.pathname;
  }

  // 操作链接目录
  cd(pathName) {
    if (pathName) {
      if (/^\//.test(pathName)) {
        this.link.pathname = pathName;
      } else {
        const src = path.posix.resolve(this.link.pathname);
        const value = path.posix.join(src, pathName);
        this.link.pathname = value || "/";
      }
    }
    return this.link.pathname;
  }

  // 根据规则生成路径并修改
  update(data) {
    const urlPattern = new UrlPattern(this.pattern);
    const result = {...this.match(), ...data};
    console.log(result);
    const value = urlPattern.stringify(result);
    if (value) {
      this.link.pathname = value;
    }
    const query = Object.assign({}, this.link.query, data);
    const omit = [];
    Object.keys(query || {}).forEach(name => {
      if (this.pattern.includes(`:${name}`)) {
        omit.push(name);
      }
    });
    this.link.query = _.omit(query, omit);
    return this.link.pathname;
  }

  // 根据规则解析 url 中的变量
  match() {
    const urlPattern = new UrlPattern(this.pattern);
    const value = urlPattern.match(this.link.pathname);
    return Object.assign(_.omit(value, ["_"]), this.link.query || {});
  }

  stringify() {
    let value = "";
    const link = this.link;
    if (link.protocol) {
      value = `${link.protocol}//${link.host}`;
    } else if (link.host) {
      value = `//${link.host}`;
    }
    value += `${link.pathname}`;
    const query = [];
    Object.keys(link.query || {}).forEach(function (name) {
      const v = safeGet(link.query, name);
      const d = v ? encodeURIComponent(`${v}`) : "";
      query.push(`${name}=${d}`);
    });
    if (query.length > 0) {
      value += `?${query.join("&")}`;
    }
    return value;
  }

  parse() {
    return this.link;
  }
}
