const defaultConfig = {
  "appName": "Simplify",
  "environment": {
    "development": true,
    "production": false
  },
  "port": 3000,
  "graphql": {
    "playground": false,
    "tracing": false
  },
  "plaid": {
    "environment": "sandbox",
    "countryCodes": ["US"],
    "language": "en",
    "products": ["auth", "transactions"]
  }
};

export default defaultConfig;
