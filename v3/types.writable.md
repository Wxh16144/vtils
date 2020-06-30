<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types](./types.md) &gt; [Writable](./types.writable.md)

## Writable type

Make readonly object writable

<b>Signature:</b>

```typescript
declare type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};
```