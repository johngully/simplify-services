import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
const environment = {
  development: false,
  production: false
};
environment[process.env.NODE_ENV] = true;
// TODO: add logic to default development to true if no value configured for the environment

export { environment, port};
