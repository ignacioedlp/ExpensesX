import {
  currencies,
  currency,
  createCurrency,
  updateCurrency,
  deleteCurrency,
} from './currencies'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('currencies', () => {
  scenario('returns all currencies', async (scenario) => {
    const result = await currencies()

    expect(result.length).toEqual(Object.keys(scenario.currency).length)
  })

  scenario('returns a single currency', async (scenario) => {
    const result = await currency({ id: scenario.currency.one.id })

    expect(result).toEqual(scenario.currency.one)
  })

  scenario('creates a currency', async () => {
    const result = await createCurrency({
      input: {
        name: 'String',
        symbol: 'String',
        updatedAt: '2023-04-22T03:56:30.011Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.symbol).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2023-04-22T03:56:30.011Z'))
  })

  scenario('updates a currency', async (scenario) => {
    const original = await currency({
      id: scenario.currency.one.id,
    })
    const result = await updateCurrency({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a currency', async (scenario) => {
    const original = await deleteCurrency({
      id: scenario.currency.one.id,
    })
    const result = await currency({ id: original.id })

    expect(result).toEqual(null)
  })
})
