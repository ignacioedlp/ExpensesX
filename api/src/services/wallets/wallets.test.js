import {
  wallets,
  wallet,
  createWallet,
  updateWallet,
  deleteWallet,
} from './wallets'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('wallets', () => {
  scenario('returns all wallets', async (scenario) => {
    const result = await wallets()

    expect(result.length).toEqual(Object.keys(scenario.wallet).length)
  })

  scenario('returns a single wallet', async (scenario) => {
    const result = await wallet({ id: scenario.wallet.one.id })

    expect(result).toEqual(scenario.wallet.one)
  })

  scenario('creates a wallet', async (scenario) => {
    const result = await createWallet({
      input: {
        title: 'String',
        amount: 6357501,
        userId: scenario.wallet.two.userId,
        updatedAt: '2023-04-22T03:03:51.954Z',
      },
    })

    expect(result.title).toEqual('String')
    expect(result.amount).toEqual(6357501)
    expect(result.userId).toEqual(scenario.wallet.two.userId)
    expect(result.updatedAt).toEqual(new Date('2023-04-22T03:03:51.954Z'))
  })

  scenario('updates a wallet', async (scenario) => {
    const original = await wallet({ id: scenario.wallet.one.id })
    const result = await updateWallet({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a wallet', async (scenario) => {
    const original = await deleteWallet({
      id: scenario.wallet.one.id,
    })
    const result = await wallet({ id: original.id })

    expect(result).toEqual(null)
  })
})
