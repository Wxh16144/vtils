import { castArray, cloneDeep } from 'lodash-uni'
import { Merge, OneOrMore } from '../types'

export interface TreeDataNode extends Record<any, any> {}

export type TreeDataSingleRootData<TNode extends TreeDataNode> = TNode

export type TreeDataMultipleRootData<TNode extends TreeDataNode> = TNode[]

export type TreeDataData<TNode extends TreeDataNode> = TNode[]

export type TreeDataChildrenPropName<TNode extends TreeDataNode> = {
  [K in keyof TNode]: TNode[K] extends TreeDataData<TNode> ? K : never
}[keyof TNode]

export type TreeDataSearchStrategy = 'DFS' | 'BFS'

export interface TreeDataOptions<TNode extends TreeDataNode> {
  /**
   * 节点上子树数据所在的属性名。
   *
   * @default 'children'
   */
  childrenPropName?: TreeDataChildrenPropName<TNode>

  /**
   * 遍历时的搜索策略。
   *
   * - `DFS`: 深度优先搜索
   * - `BFS`: 广度优先搜索
   *
   * @default 'DFS'
   */
  searchStrategy?: TreeDataSearchStrategy
}

export interface TreeDataTraverseFnPayload<TNode extends TreeDataNode> {
  /**
   * 当前节点。
   */
  node: TNode

  /**
   * 当前深度。从 `0` 开始。
   */
  depth: number

  /**
   * 父节点。为 `undefined` 时表示当前节点是根节点。
   */
  parentNode: TNode | undefined

  /**
   * 到当前节点的路径节点列表。
   */
  path: TNode[]

  /**
   * 移除当前节点。
   */
  removeNode: () => void

  /**
   * 退出遍历。
   */
  exit: () => void
}

export type TreeDataTraverseFn<TNode extends TreeDataNode> = (
  payload: TreeDataTraverseFnPayload<TNode>,
) => void

/**
 * 树数据处理。支持单根节点、多根节点树数据。
 */
export class TreeData<TNode extends TreeDataNode> {
  private data: TreeDataData<TNode>

  private childrenPropName: TreeDataChildrenPropName<TNode>

  private searchStrategy: TreeDataSearchStrategy

  /**
   * 构造函数。
   *
   * @param data 整棵树的数据
   * @param options 选项
   */
  constructor(
    data: TreeDataSingleRootData<TNode> | TreeDataMultipleRootData<TNode>,
    options: TreeDataOptions<TNode> = {},
  ) {
    this.data = cloneDeep(Array.isArray(data) ? data : [data])
    this.childrenPropName = options?.childrenPropName || ('children' as any)
    this.searchStrategy = options?.searchStrategy || 'DFS'
  }

  /**
   * 核心遍历函数。
   */
  private static traverse<TNode extends TreeDataNode>(
    data: TreeDataData<TNode>,
    childrenPropName: TreeDataChildrenPropName<TNode>,
    parentNode: TNode | undefined,
    fn: TreeDataTraverseFn<TNode>,
    searchStrategy: TreeDataSearchStrategy,
    depth: number,
    path: TNode[],
  ) {
    const removeNodeIndexes: number[] = []

    for (let i = 0, len = data.length; i < len; i++) {
      const node = data[i]

      let isRemove = false
      let isExit = false

      fn({
        node: node,
        parentNode: parentNode,
        depth: depth,
        path: path,
        removeNode: () => {
          isRemove = true
          removeNodeIndexes.push(i)
        },
        exit: () => (isExit = true),
      })

      if (isExit) return

      if (searchStrategy === 'DFS') {
        if (
          !isRemove &&
          node[childrenPropName] &&
          Array.isArray(node[childrenPropName])
        ) {
          TreeData.traverse(
            node[childrenPropName],
            childrenPropName,
            node,
            fn,
            searchStrategy,
            depth + 1,
            path.concat(node),
          )
        }
      }
    }

    // 删除节点
    for (let i = removeNodeIndexes.length - 1; i >= 0; i--) {
      data.splice(removeNodeIndexes[i], 1)
    }

    if (searchStrategy === 'BFS') {
      for (const node of data) {
        if (node[childrenPropName] && Array.isArray(node[childrenPropName])) {
          TreeData.traverse(
            node[childrenPropName],
            childrenPropName,
            node,
            fn,
            searchStrategy,
            depth + 1,
            path.concat(node),
          )
        }
      }
    }
  }

  /**
   * 遍历。
   *
   * @param fn 遍历函数
   * @param searchStrategy 遍历搜索方式，默认为选项中的遍历搜索方式
   */
  traverse(
    fn: OneOrMore<TreeDataTraverseFn<TNode> | false>,
    searchStrategy: TreeDataSearchStrategy = this.searchStrategy,
  ): this {
    const fns: Array<TreeDataTraverseFn<TNode>> = castArray(fn).filter(
      fn => typeof fn === 'function',
    ) as any
    for (const fn of fns) {
      TreeData.traverse<TNode>(
        this.data,
        this.childrenPropName,
        undefined,
        fn,
        searchStrategy,
        0,
        [],
      )
    }
    return this
  }

  /**
   * 深度优先遍历。
   *
   * @param fn 遍历函数
   */
  traverseDFS(fn: OneOrMore<TreeDataTraverseFn<TNode> | false>): this {
    return this.traverse(fn, 'DFS')
  }

  /**
   * 广度优先遍历。
   *
   * @param fn 遍历函数
   */
  traverseBFS(fn: OneOrMore<TreeDataTraverseFn<TNode> | false>): this {
    return this.traverse(fn, 'BFS')
  }

  /**
   * 设置数据深度。从 `0` 开始，将会移除超过指定深度的数据。
   *
   * @param depth 深度
   */
  setDepth(depth: number): this {
    this.traverse(payload => {
      if (payload.depth === depth) {
        delete payload.node[this.childrenPropName]
      }
    })
    return this
  }

  /**
   * 设置节点属性。
   *
   * @param props 节点属性键值映射对象，值为函数，用其返回值作为新的属性值
   */
  setNodeProps<
    TProps extends {
      [K in keyof TNode]?: (node: TNode) => any
    } & {
      [K: string]: (node: TNode) => any
    }
  >(
    props: TProps,
  ): TreeData<
    Merge<
      TNode,
      {
        [K in keyof TProps]: ReturnType<TProps[K]>
      }
    >
  > {
    this.traverse(payload => {
      for (const propName of Object.keys(props)) {
        ;(payload.node as any)[propName] = props[propName](payload.node)
      }
    })
    return this as any
  }

  /**
   * 移除节点上指定的属性。
   *
   * @param propNames 属性名列表
   */
  omitNodeProps<TPropName extends keyof TNode>(
    propNames: TPropName[],
  ): TreeData<Omit<TNode, TPropName>> {
    this.traverse(payload => {
      for (const propName of propNames) {
        delete payload.node[propName]
      }
    })
    return this as any
  }

  /**
   * 选取节点上指定的属性。
   *
   * @param propNames 属性名列表
   */
  pickNodeProps<TPropName extends keyof TNode>(
    propNames: TPropName[],
  ): TreeData<Pick<TNode, TPropName>> {
    this.traverse(payload => {
      for (const propName of Object.keys(payload.node)) {
        if (propNames.indexOf(propName as any) === -1) {
          delete payload.node[propName]
        }
      }
    })
    return this as any
  }

  /**
   * 查找符合条件的第一个节点。
   *
   * @param predicate 条件
   */
  findNode(
    predicate: (payload: TreeDataTraverseFnPayload<TNode>) => boolean,
  ): TNode | undefined {
    let node: TNode | undefined
    this.traverse(payload => {
      if (predicate(payload)) {
        node = payload.node
        payload.exit()
      }
    })
    return node
  }

  /**
   * 查找符合条件的所有节点。
   *
   * @param predicate 条件
   */
  findNodes(
    predicate: (payload: TreeDataTraverseFnPayload<TNode>) => boolean,
  ): TNode[] {
    const nodes: TNode[] = []
    this.traverse(payload => {
      if (predicate(payload)) {
        nodes.push(payload.node)
      }
    })
    return nodes
  }

  /**
   * 查找符合条件的第一个节点的路径。
   *
   * @param predicate 条件
   */
  findNodePath(
    predicate: (payload: TreeDataTraverseFnPayload<TNode>) => boolean,
  ): TNode[] | undefined {
    let path: TNode[] | undefined
    this.traverse(payload => {
      if (predicate(payload)) {
        path = payload.path.concat(payload.node)
        payload.exit()
      }
    })
    return path
  }

  /**
   * 查找符合条件的所有节点的路径。
   *
   * @param predicate 条件
   */
  findNodePaths(
    predicate: (payload: TreeDataTraverseFnPayload<TNode>) => boolean,
  ): Array<TNode[]> {
    const paths: Array<TNode[]> = []
    this.traverse(payload => {
      if (predicate(payload)) {
        paths.push(payload.path.concat(payload.node))
      }
    })
    return paths
  }

  /**
   * 移除符合条件的第一个节点。返回被移除的节点。
   *
   * @param predicate 条件
   */
  removeNode(
    predicate: (payload: TreeDataTraverseFnPayload<TNode>) => boolean,
  ): TNode | undefined {
    let node: TNode | undefined
    this.traverse(payload => {
      if (predicate(payload)) {
        payload.removeNode()
        node = payload.node
        payload.exit()
      }
    })
    return node
  }

  /**
   * 移除符合条件的所有节点。返回被移除的节点组成的数组。
   *
   * @param predicate 条件
   */
  removeNodes(
    predicate: (payload: TreeDataTraverseFnPayload<TNode>) => boolean,
  ): TNode[] {
    const nodes: TNode[] = []
    this.traverse(payload => {
      if (predicate(payload)) {
        payload.removeNode()
        nodes.push(payload.node)
      }
    })
    return nodes
  }

  /**
   * 计算符合条件的节点个数。不给出条件则计算所有节点的个数。
   *
   * @param predicate 条件
   */
  count(
    predicate?: (payload: TreeDataTraverseFnPayload<TNode>) => boolean,
  ): number {
    let counter = 0
    this.traverse(payload => {
      if (predicate ? predicate(payload) : true) {
        counter++
      }
    })
    return counter
  }

  /**
   * 克隆实例。
   */
  clone(): TreeData<TNode> {
    return new TreeData(this.export())
  }

  /**
   * 导出数据。
   */
  export(): TreeDataData<TNode> {
    return cloneDeep(this.data)
  }
}
