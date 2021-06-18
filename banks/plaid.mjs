import plaid from 'plaid';
import config from "../environment/config.mjs";
import { _ } from "../utils/index.mjs";

async function searchInstitutions(name) {
  const response = await plaidClient.searchInstitutionsByName(
    name,
    config.plaid.products,
    config.plaid.countryCodes,
    { include_optional_metadata: true }
  );
  // console.debug("Search Institutions Response:\n", response);
  return response.institutions;
}

async function getInstitution(institutionId) {
  const response = await plaidClient.getInstitutionById(
    institutionId,
    config.plaid.countryCodes,
    { include_optional_metadata: true }
  );
  // console.debug("Institution Response:\n", response);
  return response.institution;
}

async function beginAuthentication(userId) {
  const response = await plaidClient.createLinkToken({
    user: { client_user_id: userId },
    client_name: config.appName,
    country_codes: config.plaid.countryCodes,
    language: config.plaid.language,
    products: config.plaid.products
  });

  // console.debug("Link Token Response:\n", response);
  return response.link_token;
}

async function completeAuthentication(publicToken) {
  const response = await plaidClient.exchangePublicToken(publicToken);
  // console.debug("Access Token Response:\n", response);
  return response.access_token;
}

async function getAccountOwners(accessToken, accountIds) {
  const account_ids = toUniqueArray(accountIds);
  const response = await plaidClient.getIdentity(accessToken, { account_ids })
  // console.debug("Accounts Owners Response:\n", response);
  return response.accounts;
}

async function getAccounts(accessToken) {
  const response = await plaidClient.getAccounts(accessToken)
  // console.debug("Accounts Response:\n", response);
  return response.accounts;
}

async function getBalances(accessToken, accountIds) {
  const account_ids = toUniqueArray(accountIds);
  const response = await plaidClient.getBalance(accessToken, { account_ids })
  // console.debug("Balances Response:\n", response);
  return response.accounts
}

async function getTransactions(accessToken, accountIds, startDate, endDate) {
  const account_ids = toUniqueArray(accountIds);
  const response = await plaidClient.getTransactions(accessToken, startDate, endDate, { account_ids })
  // console.debug("Transactions Response:\n", response);
  return response.transactions;
}

async function refreshTransactions(accessToken) {
  // TODO: This is much more complicated and requires webhooks to understand when the accounts have been refreshed
  const response = await plaidClient.refreshTransactions(accessToken);
  // console.debug("Refresh Transactions Response:\n", response);
  return response.request_id;
}

function toUniqueArray(values) {
  return _.chain([]).concat(values).uniq().value();
}

function getPlaidClient() {
  const { clientID, secret, environment } = config.plaid;
  let env = plaid.environments[environment];
  const plaidClient = new plaid.Client({ clientID, secret, env });
  return plaidClient;
}

export async function getSandboxAccessToken(institutionId) {
  const response = await bank.plaidClient.sandboxPublicTokenCreate(institutionId, config.plaid.products);
  const publicToken = response.public_token;
  const accessToken = await completeAuthentication(publicToken);
  // console.debug("publicToken", publicToken);
  // console.debug("accessToken", accessToken);
  return accessToken;
}

export const plaidClient = getPlaidClient();

export const bank = {
  plaidClient,
  searchInstitutions,
  getInstitution,
  beginAuthentication,
  completeAuthentication,
  getAccountOwners,
  getAccounts,
  getBalances,
  getTransactions,
  refreshTransactions
}

export default bank;
