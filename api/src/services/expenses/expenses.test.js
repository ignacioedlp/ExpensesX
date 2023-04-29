import {
  expenses,
  expense,
  createExpense,
  updateExpense,
  deleteExpense,
} from './expenses'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('expenses', () => {
  scenario('returns all expenses', async (scenario) => {
    const result = await expenses()

    expect(result.length).toEqual(Object.keys(scenario.expense).length)
  })

  scenario('returns a single expense', async (scenario) => {
    const result = await expense({ id: scenario.expense.one.id })

    expect(result).toEqual(scenario.expense.one)
  })

  scenario('creates a expense', async (scenario) => {
    const result = await createExpense({
      input: {
        name: 'String',
        amount: 9585196,
        categoryId: scenario.expense.two.categoryId,
        userId: scenario.expense.two.userId,
        date: '2023-04-22T03:10:07.113Z',
        updatedAt: '2023-04-22T03:10:07.113Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.amount).toEqual(9585196)
    expect(result.categoryId).toEqual(scenario.expense.two.categoryId)
    expect(result.userId).toEqual(scenario.expense.two.userId)
    expect(result.date).toEqual(new Date('2023-04-22T03:10:07.113Z'))
    expect(result.updatedAt).toEqual(new Date('2023-04-22T03:10:07.113Z'))
  })

  scenario('updates a expense', async (scenario) => {
    const original = await expense({ id: scenario.expense.one.id })
    const result = await updateExpense({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a expense', async (scenario) => {
    const original = await deleteExpense({
      id: scenario.expense.one.id,
    })
    const result = await expense({ id: original.id })

    expect(result).toEqual(null)
  })
})
