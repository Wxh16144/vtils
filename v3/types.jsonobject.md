<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types](./types.md) &gt; [JsonObject](./types.jsonobject.md)

## JsonObject type

Matches a JSON object.

This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. Don't use this as a direct return type as the user would have to double-cast it: `jsonObject as unknown as CustomResponse`<!-- -->. Instead, you could extend your CustomResponse type from it to ensure your type only uses JSON-compatible types: `interface CustomResponse extends JsonObject { … }`<!-- -->.

<b>Signature:</b>

```typescript
export declare type JsonObject = {[Key in string]?: JsonValue};
```
<b>References:</b> [JsonValue](./types.jsonvalue.md)
