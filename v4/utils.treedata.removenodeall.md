<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [utils](./utils.md) &gt; [TreeData](./utils.treedata.md) &gt; [removeNodeAll](./utils.treedata.removenodeall.md)

## TreeData.removeNodeAll() method

移除符合条件的所有节点。返回被移除的节点组成的数组。

<b>Signature:</b>

```typescript
removeNodeAll(predicate: (payload: TreeDataTraverseFnPayload<TNode>) => boolean): TNode[];
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  predicate | (payload: [TreeDataTraverseFnPayload](./utils.treedatatraversefnpayload.md)<!-- -->&lt;TNode&gt;) =&gt; boolean | 条件 |

<b>Returns:</b>

TNode\[\]
