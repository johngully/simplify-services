import app from "./app.mjs"
import { port } from "./environment/config.mjs";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const rootValue = {
  hello: () => {
    return "Hello world"
  }
};

app.use("/graphql", graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}));

const start = async () => {
  try {
    await app.listen(port);
    console.log(`Running graphql server on port ${port}`)
  }
  catch {
    console.log(`Failed to run graphql server`)
  }
}

start();
