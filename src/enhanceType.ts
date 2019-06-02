export type AnyFunction = (...args: any[]) => any

export type AnyObject = Record<keyof any, any>

export type OneOrMore<T> = T | T[]

export type Brand<T, B> = T & { __BRAND__?: B }

export type AsyncOrSync<T> = PromiseLike<T> | T

export type ValueOf<T> = T[keyof T]

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type OmitByValue<T, ValueType> = Pick<
  T,
  { [Key in keyof T]: T[Key] extends ValueType ? never : Key }[keyof T]
>

export type OmitByValueExact<T, ValueType> = Pick<
  T,
  {
    [Key in keyof T]: [ValueType] extends [T[Key]]
      ? [T[Key]] extends [ValueType]
        ? never
        : Key
      : Key
  }[keyof T]
>

export type PickByValue<T, ValueType> = Pick<
  T,
  { [Key in keyof T]: T[Key] extends ValueType ? Key : never }[keyof T]
>

export type PickByValueExact<T, ValueType> = Pick<
  T,
  {
    [Key in keyof T]: [ValueType] extends [T[Key]]
      ? [T[Key]] extends [ValueType]
        ? Key
        : never
      : never
  }[keyof T]
>

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never
}[keyof T]

export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N

export type LiteralUnion<L, B> = L | Brand<B, never>

export type IsNever<T> = [T] extends [never] ? true : false

/**
 * 条件类型。
 *
 * @example
 * ```ts
 * type X = 'x'
 * // before
 * type IsX = X extends 'x' ? true : false
 * // after
 * type IsX = If<X extends 'x', true, false>
 * ```
 */
export type If<Condition, Then, Else> = Condition extends true ? Then : Else

/**
 * 从 `T` 中排除 `undefined` 类型。
 *
 * @example
 * ```ts
 * interface User {
 *   gender?: 'male' | 'female',
 * }
 * // before
 * type UserGender = Exclude<User['gender'], undefined>
 * // after
 * type UserGender = Defined<User['gender']>
 * ```
 */
export type Defined<T> = Exclude<T, undefined>
