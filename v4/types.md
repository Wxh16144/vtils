<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types](./types.md)

## types package

类型工具库。

## Interfaces

|  Interface | Description |
|  --- | --- |
|  [JsonArray](./types.jsonarray.md) | Matches a JSON array. |
|  [TsConfigJson](./types.tsconfigjson.md) |  |

## Namespaces

|  Namespace | Description |
|  --- | --- |
|  [PackageJson](./types.packagejson.md) |  |
|  [TsConfigJson](./types.tsconfigjson.md) |  |

## Type Aliases

|  Type Alias | Description |
|  --- | --- |
|  [AnyArray](./types.anyarray.md) | 类型工具库。 |
|  [AnyAsyncFunction](./types.anyasyncfunction.md) | 任意异步函数。 |
|  [AnyFunction](./types.anyfunction.md) | 任意函数。 |
|  [AnyObject](./types.anyobject.md) | 任意对象。 |
|  [Asyncify](./types.asyncify.md) | Create an async version of the given function type, by boxing the return type in <code>Promise</code> while keeping the same parameter types.<!-- -->Use-case: You have two functions, one synchronous and one asynchronous that do the same thing. Instead of having to duplicate the type definition, you can use <code>Asyncify</code> to reuse the synchronous type. |
|  [AsyncOrSync](./types.asyncorsync.md) | Useful as a return type in interfaces or abstract classes with missing implementation |
|  [AsyncReturnType](./types.asyncreturntype.md) | Unwrap the return type of a function that returns a <code>Promise</code>.<!-- -->There has been \[discussion\](https://github.com/microsoft/TypeScript/pull/35998) about implementing this type in TypeScript. |
|  [Buildable](./types.buildable.md) | Combination of DeepPartial and DeepWritable |
|  [CamelCase](./types.camelcase.md) | Convert a string literal to camel-case.<!-- -->This can be useful when, for example, converting some kebab-cased command-line flags or a snake-cased database result. |
|  [Class](./types.class.md) | Matches a \[<code>class</code> constructor\](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). |
|  [Defined](./types.defined.md) | 去除类型 T 中的 undefined。 |
|  [DelimiterCase](./types.delimitercase.md) | Convert a string literal to a custom string delimiter casing.<!-- -->This can be useful when, for example, converting a camel-cased object property to an oddly cased one. |
|  [DotPath](./types.dotpath.md) |  |
|  [DotPathValue](./types.dotpathvalue.md) |  |
|  [ElementOf](./types.elementof.md) | Easily extract the type of a given array's elements |
|  [FirstParameter](./types.firstparameter.md) | 返回函数 T 第一个参数的类型。 |
|  [FixedLengthArray](./types.fixedlengtharray.md) | Create a type that represents an array of the given type and length. The array's length and the <code>Array</code> prototype methods that manipulate its length are excluded in the resulting type.<!-- -->Please participate in \[this issue\](https://github.com/microsoft/TypeScript/issues/26223) if you want to have a similiar type built into TypeScript.<!-- -->Use-cases: - Declaring fixed-length tuples or arrays with a large number of items. - Creating a range union (for example, <code>0 &#124; 1 &#124; 2 &#124; 3 &#124; 4</code> from the keys of such a type) without having to resort to recursive types. - Creating an array of coordinates with a static length, for example, length of 3 for a 3D vector. |
|  [Head](./types.head.md) | Functional programming essentials |
|  [IsAny](./types.isany.md) | 判断 <code>T</code> 是否是 <code>any</code> 类型。 |
|  [IsEmptyArray](./types.isemptyarray.md) | 判断 <code>T</code> 是否是空数组。 |
|  [IsEmptyObject](./types.isemptyobject.md) | 判断 <code>T</code> 是否是空对象。 |
|  [IsNever](./types.isnever.md) | 判断 <code>T</code> 是否是 <code>never</code> 类型。 |
|  [JsonObject](./types.jsonobject.md) | Matches a JSON object.<!-- -->This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. Don't use this as a direct return type as the user would have to double-cast it: <code>jsonObject as unknown as CustomResponse</code>. Instead, you could extend your CustomResponse type from it to ensure your type only uses JSON-compatible types: <code>interface CustomResponse extends JsonObject { … }</code>. |
|  [JsonValue](./types.jsonvalue.md) | Matches any valid JSON value. |
|  [KebabCase](./types.kebabcase.md) | Convert a string literal to kebab-case.<!-- -->This can be useful when, for example, converting a camel-cased object property to a kebab-cased CSS class name or a command-line flag. |
|  [LiteralUnion](./types.literalunion.md) | Allows creating a union type by combining primitive types and literal types without sacrificing auto-completion in IDEs for the literal type part of the union.<!-- -->Currently, when a union type of a primitive type is combined with literal types, TypeScript loses all information about the combined literals. Thus, when such type is used in an IDE with autocompletion, no suggestions are made for the declared literals.<!-- -->This type is a workaround for \[Microsoft/TypeScript\#29729\](https://github.com/Microsoft/TypeScript/issues/29729). It will be removed as soon as it's not needed anymore. |
|  [Merge](./types.merge.md) | Merge 2 types, properties types from the latter override the ones defined on the former type |
|  [NonEmptyArray](./types.nonemptyarray.md) | 非空数组类型。 |
|  [NonNullableDeep](./types.nonnullabledeep.md) | Like NonNullable but recursive |
|  [NullableDeep](./types.nullabledeep.md) | Recursive nullable |
|  [OmitBy](./types.omitby.md) | Omit all properties of given type in object type |
|  [OmitDeep](./types.omitdeep.md) | Recursively omit deep properties |
|  [OmitStrict](./types.omitstrict.md) | Similar to the builtin Omit, but checks the filter strictly. |
|  [OneOrMore](./types.oneormore.md) | 同 <code>T &#124; T[]</code>。 |
|  [OptionalKeys](./types.optionalkeys.md) | Gets keys of an object which are optional |
|  [PackageJson](./types.packagejson.md) | Type for \[npm's <code>package.json</code> file\](https://docs.npmjs.com/creating-a-package-json-file). Also includes types for fields used by other popular projects, like TypeScript and Yarn. |
|  [PartialBy](./types.partialby.md) | Mark some properties as optional, leaving others unchanged |
|  [PartialDeep](./types.partialdeep.md) | Like Partial but recursive |
|  [PascalCase](./types.pascalcase.md) | Converts a string literal to pascal-case. |
|  [Path](./types.path.md) | 获取对象的路径。最多支持 7 级路径。 |
|  [PathValue](./types.pathvalue.md) | 获取对象的路径值。最多支持 7 级路径。 |
|  [PickBy](./types.pickby.md) | Pick all properties of given type in object type |
|  [ReadonlyDeep](./types.readonlydeep.md) | Like Readonly but recursive |
|  [ReadonlyKeys](./types.readonlykeys.md) | Gets keys of an object which are readonly |
|  [RequiredBy](./types.requiredby.md) | Mark some properties as required, leaving others unchanged |
|  [RequiredDeep](./types.requireddeep.md) | Like Required but recursive |
|  [RequiredKeys](./types.requiredkeys.md) | Gets keys of an object which are required |
|  [SnakeCase](./types.snakecase.md) | Convert a string literal to snake-case.<!-- -->This can be useful when, for example, converting a camel-cased object property to a snake-cased SQL column name. |
|  [Tail](./types.tail.md) |  |
|  [ValueOf](./types.valueof.md) | Easily extract the type of a given object's values |
|  [Writable](./types.writable.md) | Make readonly object writable |
|  [WritableDeep](./types.writabledeep.md) | Like Writable but recursive |
|  [WritableKeys](./types.writablekeys.md) | Gets keys of an object which are writable |
