import { db } from 'src/lib/db'

export const expenses = () => {
  return db.expense.findMany()
}

export const expense = ({ id }) => {
  return db.expense.findUnique({
    where: { id },
  })
}

export const createExpense = ({ input }) => {
  return db.expense.create({
    data: input,
  })
}

export const updateExpense = ({ id, input }) => {
  return db.expense.update({
    data: input,
    where: { id },
  })
}

export const deleteExpense = ({ id }) => {
  return db.expense.delete({
    where: { id },
  })
}

export const Expense = {
  category: (_obj, { root }) => {
    return db.expense.findUnique({ where: { id: root?.id } }).category()
  },
  user: (_obj, { root }) => {
    return db.expense.findUnique({ where: { id: root?.id } }).user()
  },
  expensesForMonths: (_obj, { root }) => {
    const expensesByMonth = db.expense.groupBy({
      by: ['date.getMonth()'],
      sum: { amount: true },
    })

    return expensesByMonth.map((groupedExpense) => {
      const monthNumber = parseInt(groupedExpense['date.getMonth()'])
      const monthName = new Date(1970, monthNumber, 1).toLocaleString('default', { month: 'long' })
      return {
        month: monthName,
        total: groupedExpense.amount.sum,
      }
    })
  },

}
