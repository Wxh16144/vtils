<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [react](./react.md) &gt; [UseControllableValueOptions](./react.usecontrollablevalueoptions.md)

## UseControllableValueOptions type

<b>Signature:</b>

```typescript
export declare type UseControllableValueOptions<TProps, TDefaultValuePropName extends keyof TProps, TValuePropName extends keyof TProps, TCallbackPropName extends keyof TProps, TDefaultValue extends TProps[TValuePropName]> = {
    defaultValuePropName: TDefaultValuePropName;
    valuePropName: TValuePropName;
    callbackPropName: TCallbackPropName;
    defaultValue?: TDefaultValue;
    alwaysUpdateValue?: boolean;
};
```