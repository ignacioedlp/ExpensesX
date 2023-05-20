export const schema = gql`
  type Category {
    id: Int!
    name: String!
    currency: Currency!
    color: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    totalExpenses: Int!
    totalForMonth: [Int!]!
    expenses: [Expense!]!
  }

  type Query {
    categories: [Category!]! @requireAuth
    category(id: Int!): Category @requireAuth
  }

  input CreateCategoryInput {
    name: String!
    currencyId: Int!
    userId: Int!
    color: String
  }

  input UpdateCategoryInput {
    name: String
    currencyId: Int
    color: String
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category! @requireAuth
    updateCategory(id: Int!, input: UpdateCategoryInput!): Category!
      @requireAuth
    deleteCategory(id: Int!): Category! @requireAuth
  }
`
