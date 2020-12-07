import { range } from 'lodash-uni'
import { TreeData } from './TreeData'

describe('TreeData', () => {
  const data = range(0, 10).map(i => ({
    id: `${i}`,
    children: range(0, 10).map(i2 => ({
      id: `${i}.${i2}`,
      children: [],
    })),
  }))

  test('export', () => {
    expect(new TreeData(data).export()).toEqual(data)
  })

  describe('traverse', () => {
    test('basic', () => {
      const ids: string[] = []
      new TreeData(data).traverse(payload => {
        ids.push(payload.node.id)
      })
      expect(ids).toMatchSnapshot()
    })

    test('traverseDFS', () => {
      const ids: string[] = []
      new TreeData(data).traverseDFS(payload => {
        ids.push(payload.node.id)
      })
      expect(ids).toMatchSnapshot()
    })

    test('traverseBFS', () => {
      const ids: string[] = []
      new TreeData(data).traverseBFS(payload => {
        ids.push(payload.node.id)
      })
      expect(ids).toMatchSnapshot()
    })

    test('searchMethod = DFS', () => {
      const ids: string[] = []
      new TreeData(data, {
        searchMethod: 'DFS',
      }).traverse(payload => {
        ids.push(payload.node.id)
      })
      expect(ids).toMatchSnapshot()
    })

    test('searchMethod = BFS', () => {
      const ids: string[] = []
      new TreeData(data, {
        searchMethod: 'BFS',
      }).traverse(payload => {
        ids.push(payload.node.id)
      })
      expect(ids).toMatchSnapshot()
    })

    test('removeNode', () => {
      const ids: string[] = []
      new TreeData(data).traverse([
        payload => {
          if (payload.node.id.endsWith('.3')) {
            payload.removeNode()
          }
        },
        payload => {
          ids.push(payload.node.id)
        },
      ])
      expect(ids).toMatchSnapshot()
    })
  })

  test('setNodeProps', () => {
    expect(
      new TreeData(data)
        .setNodeProps({
          value: node => node.id,
          id2: node => `${node.id}[2]`,
        })
        .export(),
    ).toMatchSnapshot()
  })

  test('omitNodeProps', () => {
    expect(new TreeData(data).omitNodeProps(['id']).export()).toMatchSnapshot()
  })

  test('pickNodeProps', () => {
    expect(new TreeData(data).pickNodeProps(['id']).export()).toMatchSnapshot()
  })

  test('setDepth', () => {
    expect(new TreeData(data).setDepth(0).export()).toMatchSnapshot()
  })

  test('综合', () => {
    const names: string[] = []
    const names2: string[] = []
    expect(
      new TreeData(data)
        .setNodeProps({
          name: node => `name${node.id}`,
          gender: () => `male`,
        })
        .omitNodeProps(['gender'])
        .traverse(({ node }) => {
          names.push(node.name)
        })
        .traverse(({ node }) => {
          names2.push(node.name)
        }, 'BFS')
        .export(),
    ).toMatchSnapshot()
    expect(names).toMatchSnapshot()
    expect(names2).toMatchSnapshot()
  })
})