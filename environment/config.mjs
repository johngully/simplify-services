import dotenv from "dotenv";
import defaultConfig from "./defaultConfig.mjs";
import { _ }  from "../utils/index.mjs";

dotenv.config();

// Get values from the environment configuration
const config = {
  appName: process.env.APP_NAME,
  port: _.toPositiveInteger(process.env.PORT),
  environment: {},
  graphql: {
    playground: _.toBoolean(process.env.GRAPHQL_PLAYGROUND),
    tracing: _.toBoolean(process.env.GRAPHQL_TRACING)
  },
  plaid: {
    clientID: process.env.PLAID_CLIENT_ID,
    secret: process.env.PLAID_SECRET,
    environment: process.env.PLAID_ENVIRONMENT,
    countryCodes: process.env.PLAID_COUNTRY_CODES,
    language: process.env.PLAID_LANGUAGE
  }
}
// If an environment has been declared, then add the value
// This guard prevents "undefined" from being added as an environment
if (process.env.NODE_ENV) {
  config.environment[process.env.NODE_ENV] = true
}

// Apply the default values for anything that is not specified in the environment
_.defaultsDeep(config, defaultConfig);
// console.debug("config:\n", config);

export const port = config.port;
export const environment = config.environment;
export { config };
export default config;
