/**
 * @file Url
 * @author svon.me@gmail.com
 */

declare interface Link {
	protocol?: string;
	host?: string;
	query: object;
	pathname: string;
}

declare class Url {
	/**
	 * @param link url 链接
	 */
	constructor(link: string | Link)
	/**
	 * @param link url 链接
	 * @param pattern url 规则
	 */
	constructor(link: string | Link, pattern: RegExp | string)

	/**
	 * 路径操作, 同终端命令 cd 相同功能
	 * @param src 路径
	 */
	cd (src: string): string

	/**
	 * 修改 url 链接
	 * @param data url 路径参数与 url query
	 * @description 如果有 url 路径参数，data 排出 url 路径参数以外的自动为 url query 参数
	 */
	update(data: object): string

	/**
	 * 获取 url 路径参数及 url query 参数
	 */
	match(): object

	/**
	 * 生成 url 链接
	 */
	stringify(): string

	/**
	 * 获取 url 对象
	 */
	parse(): Link
}

export { Url }
