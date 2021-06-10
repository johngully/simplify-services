import { ApolloServer } from "apollo-server";
import config from "../environment/config.mjs";
import typeDefs from "./typeDefs/index.mjs";

const resolvers = {
  Query: {
    hello: () => {
      return "Hello world"
    }
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: config.graphql.playground,
  tracing: config.graphql.tracing
});

export default apolloServer;
