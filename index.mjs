import { port } from "./environment/config.mjs";
import apolloServer from "./graphql/index.mjs";

try {
  const { url } = await apolloServer.listen({ port })
  console.log(`Running graphql server on port ${url}`)
}
catch (error) {
  console.error(`Failed to run graphql server:\n`, error);
}
