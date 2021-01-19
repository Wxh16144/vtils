import { base64UrlDecode, base64UrlEncode } from './base64'
import { isPlainObject, mapValues, range, shuffle } from 'lodash-uni'
import { isType } from './isType'
import { rot13 } from './rot13'

export type RawList<TItem = any> = TItem[]

export interface WrappedList<TItem = any> {
  readonly _k: Array<keyof TItem>
  readonly _v: Array<Array<TItem[keyof TItem]>>
  readonly _s: string
}

/**
 * 列表打包器。
 */
export class ListWrapper {
  private static encodeValueIndexes(indexes: number[]) {
    return rot13(
      base64UrlEncode(
        `${Math.random().toString(36).slice(2)}.${indexes.join('.')}`,
      ),
    )
  }

  private static decodeValueIndexes(value: string) {
    return base64UrlDecode(rot13(value)).split('.').slice(1).map(Number)
  }

  /**
   * 打包结构化列表数据。
   *
   * @returns 返回打包后的结构化列表数据
   */
  static wrap<TItem>(rawList: RawList<TItem>): WrappedList<TItem> {
    const keys: Array<keyof TItem> = rawList.length
      ? shuffle(Object.keys(rawList[0]) as any)
      : []
    const valueIndexes: number[] = shuffle(range(0, keys.length))
    const values = []
    for (const rawItem of rawList) {
      const item = []
      for (let i = 0, len = valueIndexes.length; i < len; i++) {
        item[valueIndexes[i]] = rawItem[keys[i]]
      }
      values.push(item)
    }
    return {
      _k: keys,
      _v: values,
      _s: ListWrapper.encodeValueIndexes(valueIndexes),
    }
  }

  /**
   * 返回结果同 `wrap()`，不过类型是原列表的类型。
   */
  static wrapAsRawType<TItem>(rawList: RawList<TItem>): RawList<TItem> {
    return ListWrapper.wrap(rawList) as any
  }

  /**
   * 解包结构化列表数据。
   *
   * @returns 返回解包后的结构化列表数据
   */
  static unwrap<TItem>(wrappedList: WrappedList<TItem>): RawList<TItem> {
    const rawList: TItem[] = []
    const valueIndexes = ListWrapper.decodeValueIndexes(wrappedList._s)
    for (const values of wrappedList._v) {
      const item: TItem = {} as any
      for (let i = 0, len = valueIndexes.length; i < len; i++) {
        item[wrappedList._k[i]] = values[valueIndexes[i]]
      }
      rawList.push(item)
    }
    return rawList
  }

  /**
   * 如果是打包后的列表数据，则解包后返回，否则直接返回。如果是对象，则递归尝试解包。
   *
   * @param value 数据
   * @param depth 递归层级，默认：2
   * @returns 返回结果数据
   */
  static unwrapIfNeeded(value: any, depth = 2): any {
    if (isPlainObject(value) && isType<WrappedList>(value)) {
      if (value._k && value._v && value._s) {
        return ListWrapper.unwrap(value)
      }
      if (depth > 0) {
        return mapValues(value, v => ListWrapper.unwrapIfNeeded(v, depth - 1))
      }
    }
    return value
  }
}