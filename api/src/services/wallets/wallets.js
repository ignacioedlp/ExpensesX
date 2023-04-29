import { db } from 'src/lib/db'

export const wallets = () => {
  return db.wallet.findMany()
}

export const wallet = ({ id }) => {
  return db.wallet.findUnique({
    where: { id },
  })
}

export const createWallet = ({ input }) => {
  return db.wallet.create({
    data: input,
  })
}

export const updateWallet = ({ id, input }) => {
  return db.wallet.update({
    data: input,
    where: { id },
  })
}

export const deleteWallet = ({ id }) => {
  return db.wallet.delete({
    where: { id },
  })
}

export const Wallet = {
  user: (_obj, { root }) => {
    return db.wallet.findUnique({ where: { id: root?.id } }).user()
  },
  categories: (_obj, { root }) => {
    return db.wallet.findUnique({ where: { id: root?.id } }).categories()
  },
}
