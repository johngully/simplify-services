import { ApolloServer } from "apollo-server";
import config from "../environment/config.mjs";
import typeDefs from "./typeDefs/index.mjs";
import { accounts, envelopes, transactions } from "./data.mjs";
import { bank, getSandboxAccessToken } from "../banks/plaid.mjs";

const resolvers = {
  Query: {
    bankAccessToken: async (parent, args, context, info) => {
      return await bank.completeAuthentication(args.publicToken);
    },
    bankLinkToken: async (parent, args, context, info) => {
      return await bank.beginAuthentication(args.userId);
    },
    bankSandboxAccessToken: async (parent, args, context, info) => {
      return await getSandboxAccessToken(args.institutionId);
    },
    accounts: async (parent, args) => {
      // return accounts;
      const accessToken = args.accessToken;
      const plaidAccounts = await bank.getAccounts(accessToken);
      const accounts = plaidAccounts.map((account) => {
        return {
          id: account.account_id,
          bank: "",
          routingNumber: "",
          accountNumber: account.mask,
          accountType: account.subtype,
          owner: "",
          name: "",
          description: ""
        };
      });
      return accounts;
    },
    account: (parent, args, context, info) => {
      return accounts.find(account => account.id === args.id)
    },
    envelopes: () =>{
      return envelopes;
    },
    envelope: (parent, args, context, info) => {
      return envelopes.find(envelope => envelope.id === args.id)
    },
    transactions: async (parent, args) => {
      // return transactions;
      const { accessToken, accountIds, startDate, endDate } = args;
      const plaidTransactions = await bank.getTransactions(accessToken, accountIds, startDate, endDate);
      const transactions = plaidTransactions.map(transaction => {
        console.log(transaction)
        return {
          id: transaction.transaction_id,
          accountId: transaction.accountId,
          timestamp: transaction.date,
          pending: transaction.pending,
          amount: transaction.amount,
          currency: transaction.iso_currency_code,
          description: "",
          name: transaction.name,
          merchant: transaction.merchant_name,
          note: "",
          // envelope: Envelope
          created: transaction.date,
          updated: "",
        };
      });
      return transactions
    },
    transaction: (parent, args, context, info) => {
      return transactions.find(transaction => transaction.id === args.id)
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
