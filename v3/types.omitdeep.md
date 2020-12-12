<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types](./types.md) &gt; [OmitDeep](./types.omitdeep.md)

## OmitDeep type

Recursively omit deep properties

<b>Signature:</b>

```typescript
export declare type OmitDeep<T extends DeepOmitModify<Filter>, Filter> = T extends Builtin
  ? T
  : T extends Map<infer KeyType, infer ValueType>
  ? ValueType extends DeepOmitModify<Filter>
    ? Map<KeyType, OmitDeep<ValueType, Filter>>
    : T
  : T extends ReadonlyMap<infer KeyType, infer ValueType>
  ? ValueType extends DeepOmitModify<Filter>
    ? ReadonlyMap<KeyType, OmitDeep<ValueType, Filter>>
    : T
  : T extends WeakMap<infer KeyType, infer ValueType>
  ? ValueType extends DeepOmitModify<Filter>
    ? WeakMap<KeyType, OmitDeep<ValueType, Filter>>
    : T
  : T extends Set<infer ItemType>
  ? ItemType extends DeepOmitModify<Filter>
    ? Set<OmitDeep<ItemType, Filter>>
    : T
  : T extends ReadonlySet<infer ItemType>
  ? ItemType extends DeepOmitModify<Filter>
    ? ReadonlySet<OmitDeep<ItemType, Filter>>
    : T
  : T extends WeakSet<infer ItemType>
  ? ItemType extends DeepOmitModify<Filter>
    ? WeakSet<OmitDeep<ItemType, Filter>>
    : T
  : T extends Array<infer ItemType>
  ? ItemType extends DeepOmitModify<Filter>
    ? Array<OmitDeep<ItemType, Filter>>
    : T
  : T extends Promise<infer ItemType>
  ? ItemType extends DeepOmitModify<Filter>
    ? Promise<OmitDeep<ItemType, Filter>>
    : T
  : {
      [K in Exclude<OptionalKeys<T>, keyof Filter>]+?: T[K];
    } &
      OmitBy<
        {
          [K in Extract<OptionalKeys<T>, keyof Filter>]+?: Filter[K] extends true
            ? never
            : T[K] extends DeepOmitModify<Filter[K]>
            ? OmitDeep<T[K], Filter[K]>
            : T[K];
        },
        never
      > &
      {
        [K in Exclude<RequiredKeys<T>, keyof Filter>]: T[K];
      } &
      OmitBy<
        {
          [K in Extract<RequiredKeys<T>, keyof Filter>]: Filter[K] extends true
            ? never
            : T[K] extends DeepOmitModify<Filter[K]>
            ? OmitDeep<T[K], Filter[K]>
            : T[K];
        },
        never
      >;
```
<b>References:</b> [OmitDeep](./types.omitdeep.md)<!-- -->, [OptionalKeys](./types.optionalkeys.md)<!-- -->, [OmitBy](./types.omitby.md)<!-- -->, [RequiredKeys](./types.requiredkeys.md)
