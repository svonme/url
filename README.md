# url

url 常用方法

`$ npm install @fengqiaogang/url`



```
const {Url} = require("@fengqiaogang/url");

const url = new Url("/data/100");
```

## cd [路径切换]

```
url.cd("../101") => /data/101
```

## update [修改路径]

实例化 url 对象时需指定 url pattern 规则

```
const url = new Url("/data/100", "/data/:id");

url.update({ id: 102 }) => /data/102
```

## match [获取 url 中的数据]
如果有设置 url pattern 规则，会一并返回

```
const url = new Url("/data/100?keyword=hello", "/data/:id");

url.match() => {
    id: "100",
    keyword: "hello"
}
```

## stringify [获取 url 链接]

```
const url = new Url("/data/100", "/data/:id");

url.stringify() => /data/100

url.cd("../101")
url.stringify() => /data/101
```

## parse [获取 url 对象]

```
url.parse() => {
    protocol: "协议",
    host: "host",
    query: "url 查询参数",
    pathname: "url 路径"
}
```
