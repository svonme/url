/**
 * @file util
 * @author svon.me@gmail.com
 */

export const omit = function (data, keys = []) {
  if (!data) {
    return {};
  }
  if (keys.length > 0) {
    return Object.keys(data).reduce(function (result, name) {
      if (keys.includes(name)) {
        return result;
      }
      result[name] = data[name];
      return result;
    }, {});
  }
  return data || {};
}
