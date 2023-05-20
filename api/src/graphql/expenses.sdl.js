export const schema = gql`
  type Expense {
    id: Int!
    name: String!
    amount: Int!
    category: Category!
    categoryId: Int!
    user: User
    userId: Int!
    date: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
    expensesForMonths: [Int!]!
  }

  type Query {
    expenses: [Expense!]! @requireAuth
    expense(id: Int!): Expense @requireAuth
    getLast20Expenses: [Expense!]! @requireAuth
  }

  input CreateExpenseInput {
    name: String!
    amount: Int!
    categoryId: Int!
    userId: Int!
    date: DateTime!
  }

  input UpdateExpenseInput {
    name: String
    amount: Int
    categoryId: Int
    date: DateTime
  }

  type Mutation {
    createExpense(input: CreateExpenseInput!): Expense! @requireAuth
    updateExpense(id: Int!, input: UpdateExpenseInput!): Expense! @requireAuth
    deleteExpense(id: Int!): Expense! @requireAuth
  }
`
