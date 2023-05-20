import { db } from 'src/lib/db'

export const categories = () => {
  return db.category.findMany()
}

export const category = ({ id }) => {
  return db.category.findUnique({
    where: { id },
  })
}

export const createCategory = ({ input }) => {
  return db.category.create({
    data: input,
  })
}

export const updateCategory = ({ id, input }) => {
  return db.category.update({
    data: input,
    where: { id },
  })
}

export const deleteCategory = ({ id }) => {
  return db.category.delete({
    where: { id },
  })
}

export const Category = {
  user: (_obj, { root }) =>
    db.category.findFirst({ where: { id: root.id } }).user(),
  currency: (_obj, { root }) =>
    db.category.findFirst({ where: { id: root.id } }).currency(),
  expenses: (_obj, { root }) =>
    db.category.findFirst({ where: { id: root.id } }).expenses({
      orderBy: {
        date: 'desc',
      },
    }),
  totalExpenses: async (_obj, { root }) => {
    const expenses = await db.expense.findMany({
      where: { categoryId: root.id },
    })
    return expenses.reduce((acc, curr) => acc + curr.amount, 0)
  },
  // Devolver el total por mes de un año gastado en esta categoría
  totalForMonth: async (_obj, { root }) => {
    const currentYear = new Date().getFullYear(); // obtener el año actual
    const expenses = await db.expense.findMany({
      where: {
        categoryId: root.id,
        date: {
          gte: new Date(currentYear, 0, 1), // filtro para expenses con fecha a partir del 1 de enero del año actual
          lt: new Date(currentYear + 1, 0, 1) // filtro para expenses con fecha anterior al 1 de enero del próximo año
        }
      },
    });

    const totalForMonth = new Array(12).fill(0);

    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const month = date.getMonth();
      const index = month;
      totalForMonth[index] += expense.amount;
    });

    return totalForMonth;
  },
}
