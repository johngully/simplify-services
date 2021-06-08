export const typeDef = `
  type Transaction {
    id: ID
    account: String
    timestamp: String
    amount: Float
    description: String
    name: String
    note: String
    envelope: Envelope
    created: String
    updated: String
  }
;`

export const resolvers = {
  Transaction: {

  }
};
