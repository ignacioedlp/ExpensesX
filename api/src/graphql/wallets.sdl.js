export const schema = gql`
  type Wallet {
    id: Int!
    title: String!
    amount: Int!
    user: User
    userId: Int!
    categories: [Category]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    wallets: [Wallet!]! @requireAuth
    wallet(id: Int!): Wallet @requireAuth
  }

  input CreateWalletInput {
    title: String!
    amount: Int!
    userId: Int!
  }

  input UpdateWalletInput {
    title: String
    amount: Int
  }

  type Mutation {
    createWallet(input: CreateWalletInput!): Wallet! @requireAuth
    updateWallet(id: Int!, input: UpdateWalletInput!): Wallet! @requireAuth
    deleteWallet(id: Int!): Wallet! @requireAuth
  }
`
