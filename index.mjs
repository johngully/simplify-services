import { port } from "./environment/config.mjs";
import apolloServer from "./graphql/index.mjs";
import { bank, getSandboxAccessToken } from "./banks/plaid.mjs";
import config from "./environment/config.mjs";
import util from "util";
// Set the object expansion depth to unlimited
// so that console.log() will log more verbosely
util.inspect.defaultOptions.depth = null;

const userId = "123-test-user-id";
const institutionId = "ins_109508";
const startDate = "2021-06-01";
const endDate = "2021-06-30"
const getAccountIds = (accounts) => [accounts[0].account_id, accounts[1].account_id];

try {
  const { url } = await apolloServer.listen({ port })
  console.log(`Running graphql server on port ${url}`)
}
catch (error) {
  console.error(`Failed to run graphql server:\n`, error);
}
