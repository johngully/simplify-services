import { ApolloServer } from "apollo-server-express";
import { environment } from "../config/environment.mjs";

const apolloServer = new ApolloServer({
  payground: environment.development
});

export default apolloServer;
