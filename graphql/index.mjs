import { ApolloServer } from "apollo-server";
import config from "../environment/config.mjs";
import typeDefs from "./typeDefs/index.mjs";
import { transactions, envelopes } from "./data.mjs";

const resolvers = {
  Query: {
    transactions: () => {
      return transactions;
    },
    transaction: (parent, args, context, info) => {
      return transactions.find(transaction => transaction.id === args.id)
    },
    envelopes: () =>{
      return envelopes;
    },
    envelope: (parent, args, context, info) => {
      return envelopes.find(envelope => envelope.id === args.id)
    },
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: config.graphql.playground,
  tracing: config.graphql.tracing
});

export default apolloServer;


// TEST QUERIES

// TRANSACTIONS
//
// query {
//   transactions {
//     id,
//     account,
//     timestamp,
//     amount,
//     description,
//     name,
//     note,
//     envelope {
//       id,
//       targetBalance,
//       currentBalance,
//       name,
//       description
//     },
//     created,
//     updated,
//   }
// }

// TRANSACTION
//
// {"id": "123"}
//
// query($id: ID!) {
//   transaction(id: $id) {
//     id,
//     account,
//     timestamp,
//     amount,
//     description,
//     name,
//     note,
//     created,
//     updated,
//   }
// }

// ENVELOPES
//
// query {
//   envelopes {
//     id,
//     targetBalance,
//     currentBalance,
//     name,
//     description,
//     transactions {
//       id,
//       account,
//       timestamp,
//       amount,
//       description,
//       name,
//       note,
//       created,
//       updated,
//     }
//   }
// }

// ENVELOPE
//
// {"id": "321"}
//
// query($id: ID!){
//   envelope(id: $id) {
//     id,
//     targetBalance,
//     currentBalance,
//     name,
//     description,
//     transactions {
//       id,
//       account,
//       timestamp,
//       amount,
//       description,
//       name,
//       note,
//       created,
//       updated,
//     }
//   }
// }
