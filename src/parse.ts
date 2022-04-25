// @ts-ignore
import Url from "url";
// @ts-ignore
import _ from "lodash";

export interface LinkData {
	protocol?: string;
	host?: string;
	query: object;
	pathname: string;
}

export const parse = function(link: string): LinkData {
	const value = Url.parse(link, true);
	// @ts-ignore
	const data: LinkData = _.pick<UrlData>(value, ["protocol", "host", "query", "pathname"]);
	if (!data.query) {
		data.query = {};
	}
	if (data.pathname) {
		return data;
	}
	data.pathname = "/";
	return data;
}
