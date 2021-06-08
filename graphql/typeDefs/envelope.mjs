export const typeDef = `
  type Envelope {
    id: ID
    targetBalance: Float
    currentBalance: Float
    name: String
    description: String
    transactions: [Transaction]
  }
;`
