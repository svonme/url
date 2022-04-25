/**
 * @file URL
 * @author svon.me@gmail.com
 */
// @ts-ignore
import UrlPattern from "url-pattern";
// @ts-ignore
import path from "path";
// @ts-ignore
import _ from "lodash";
import {LinkData, parse} from "./parse";
// @ts-ignore
import safeGet from "@fengqiaogang/safe-get";
// @ts-ignore
import safeSet from "@fengqiaogang/safe-set";

export class Url {
	public link: LinkData;
	// 中英文键名
	public languageName: string = "lang";

	constructor(link: string = "/") {
		this.link = parse(link);
	}

	// 操作链接目录
	cd(pathName?: string) {
		if (pathName) {
			if (/^\//.test(pathName)) {
				this.link.pathname = pathName;
			} else {
				const src = path.posix.resolve(this.link.pathname);
				const value: string = path.posix.join(src, pathName);
				this.link.pathname = value || "/";
			}
		}
	}

	// 根据规则生成路径并修改
	setPathName(pattern: string, data: object = {}) {
		const urlPattern = new UrlPattern(pattern);
		const lang = this.getLanguage() || "en"; // 默认为英文
		const value = urlPattern.stringify({lang, ...data});
		if (value) {
			this.link.pathname = value;
		}
		const query = Object.assign({}, this.link.query, data);
		const omit: string[] = [];
		Object.keys(query).forEach(function (name: string) {
			if (pattern.includes(`:${name}`)) {
				omit.push(name);
			}
		});
		this.link.query = _.omit(query, omit);
	}
	// 根据规则解析 url 中的变量
	match(pattern: string): object | undefined {
		if (pattern) {
			const urlPattern = new UrlPattern(pattern.includes("*") ? pattern : `${pattern}/*`);
			const value = urlPattern.match(this.link.pathname);
			return Object.assign(_.omit(value, ["_"]), this.link.query);
		}
		return this.link.query;
	}

	// 获取中英文类型
	getLanguage() {
		const lang = safeGet<string>(this.link.query, this.languageName);
		if (lang) {
			return lang;
		}
		const pattern = new UrlPattern(`/:${this.languageName}/*`);
		const data: object = pattern.match(this.link.pathname);
		if (data && safeGet<string>(data, this.languageName)) {
			return safeGet<string>(data, this.languageName);
		}
	}

	// 更改 url 中的中英文
	setLanguage(language: string) {
		const lang = this.getLanguage();
		let value: string = this.link.pathname;
		if (lang) {
			value = `/${language}${this.link.pathname}`;
			this.link.query = _.omit(this.link.query, [ this.languageName ]);
		} else {
			value = value.replace(/^\/.+\//, `/${language}/`);
		}
		this.link.pathname = value;
	}

	stringify() {
		let value: string = "";
		const link = this.link;
		if (link.protocol) {
			value = `${link.protocol}//${link.host}`;
		} else if (link.host) {
			value = `//${link.host}`;
		}
		value += `${link.pathname}`;
		const query: string[] = [];
		Object.keys(link.query).forEach(function (name: string) {
			const v = safeGet<string>(link.query, name);
			const d = encodeURIComponent(v);
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
