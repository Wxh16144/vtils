<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types](./types.md) &gt; [AsyncReturnType](./types.asyncreturntype.md)

## AsyncReturnType type

Unwrap the return type of a function that returns a `Promise`<!-- -->.

There has been \[discussion\](https://github.com/microsoft/TypeScript/pull/35998) about implementing this type in TypeScript.

<b>Signature:</b>

```typescript
export declare type AsyncReturnType<Target extends AsyncFunction> = PromiseValue<ReturnType<Target>>;
```

## Example


```ts
import {AsyncReturnType} from 'type-fest';
import {asyncFunction} from 'api';

// This type resolves to the unwrapped return type of `asyncFunction`.
type Value = AsyncReturnType<typeof asyncFunction>;

async function doSomething(value: Value) {}

asyncFunction().then(value => doSomething(value));

```
