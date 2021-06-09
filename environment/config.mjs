import dotenv from "dotenv";

dotenv.config();

const config = {
  environment: {
    development: false,
    production: false
  },
  port: 3000,
  graphql: {
    playground: false
  }
};

config.port = process.env.PORT || config.port;
config.environment[process.env.NODE_ENV] = true;
// TODO: add logic to default development to true if no value configured for the environment
config.graphql.playground = process.env.GRAPHQL_PLAYGROUND || config.graphql.playground;

export const port = config.port;
export const environment = config.environment;
export { config };
export default config;
