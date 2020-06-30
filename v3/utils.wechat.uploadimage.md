<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [utils](./utils.md) &gt; [Wechat](./utils.wechat.md) &gt; [uploadImage](./utils.wechat.uploadimage.md)

## Wechat.uploadImage() method

上传图片。

\*\*备注：\*\* 上传图片有效期3天， 可用微信多媒体接口下载图片到自己的服务器， 此处获得的服务器端 ID 即 `media_id`<!-- -->。

<b>Signature:</b>

```typescript
uploadImage(params: WechatUploadImageParams): Promise<string>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  params | [WechatUploadImageParams](./utils.wechatuploadimageparams.md) | 参数 |

<b>Returns:</b>

Promise&lt;string&gt;

图片的服务器端 ID
