<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [utils](./utils.md) &gt; [RichUrl](./utils.richurl.md) &gt; [parse](./utils.richurl.parse.md)

## RichUrl.parse() method

解析富链接。非富链接的会直接将其值作为 url 返回。

<b>Signature:</b>

```typescript
static parse<TDesc>(richUrl: string): ParsedRichUrl<TDesc>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  richUrl | string | 富链接 |

<b>Returns:</b>

[ParsedRichUrl](./utils.parsedrichurl.md)<!-- -->&lt;TDesc&gt;

返回解析结果
