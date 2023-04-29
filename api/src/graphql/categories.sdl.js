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
    # Devolver el total por mes gastado en esta categoría en un objeto con la forma { key: 'month-year', total: 0 }
    totalForMonth: [Int!]!
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
