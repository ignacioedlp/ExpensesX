export const schema = gql`
  type Currency {
    id: Int!
    name: String!
    symbol: String!
    categories: [Category]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    currencies: [Currency!]! @requireAuth
    currency(id: Int!): Currency @requireAuth
  }

  input CreateCurrencyInput {
    name: String!
    symbol: String!
  }

  input UpdateCurrencyInput {
    name: String
    symbol: String
  }

  type Mutation {
    createCurrency(input: CreateCurrencyInput!): Currency! @requireAuth
    updateCurrency(id: Int!, input: UpdateCurrencyInput!): Currency!
      @requireAuth
    deleteCurrency(id: Int!): Currency! @requireAuth
  }
`
