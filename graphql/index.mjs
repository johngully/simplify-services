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

// Enable playground if the environment is
const playground = config.graphql.playground;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground,
});

export default apolloServer;
