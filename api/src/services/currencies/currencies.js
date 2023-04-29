import { db } from 'src/lib/db'

export const currencies = () => {
  return db.currency.findMany()
}

export const currency = ({ id }) => {
  return db.currency.findUnique({
    where: { id },
  })
}

export const createCurrency = ({ input }) => {
  return db.currency.create({
    data: input,
  })
}

export const updateCurrency = ({ id, input }) => {
  return db.currency.update({
    data: input,
    where: { id },
  })
}

export const deleteCurrency = ({ id }) => {
  return db.currency.delete({
    where: { id },
  })
}

export const Currency = {
  categories: (_obj, { root }) => {
    return db.currency.findUnique({ where: { id: root?.id } }).categories()
  },
}
