import { port } from "./environment/config.mjs";
import apolloServer from "./graphql/index.mjs";
import util from "util";
// Set the object expansion depth to unlimited
// so that console.log() will log more verbosely
util.inspect.defaultOptions.depth = null;


try {
  const { url } = await apolloServer.listen({ port })
  console.log(`Running graphql server on port ${url}`)
}
catch (error) {
  console.error(`Failed to run graphql server:\n`, error);
}
