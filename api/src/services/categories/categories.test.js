import {
  categories,
  category,
  createCategory,
  updateCategory,
  deleteCategory,
} from './categories'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('categories', () => {
  scenario('returns all categories', async (scenario) => {
    const result = await categories()

    expect(result.length).toEqual(Object.keys(scenario.category).length)
  })

  scenario('returns a single category', async (scenario) => {
    const result = await category({ id: scenario.category.one.id })

    expect(result).toEqual(scenario.category.one)
  })

  scenario('creates a category', async () => {
    const result = await createCategory({
      input: {
        name: 'String',
        currency: 2525901,
        updatedAt: '2023-04-22T02:10:03.052Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.currency).toEqual(2525901)
    expect(result.updatedAt).toEqual(new Date('2023-04-22T02:10:03.052Z'))
  })

  scenario('updates a category', async (scenario) => {
    const original = await category({
      id: scenario.category.one.id,
    })
    const result = await updateCategory({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a category', async (scenario) => {
    const original = await deleteCategory({
      id: scenario.category.one.id,
    })
    const result = await category({ id: original.id })

    expect(result).toEqual(null)
  })
})
