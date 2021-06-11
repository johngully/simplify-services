import plaid from 'plaid';
import config from "../environment/config.mjs";
import { _ } from "../utils/index.mjs";

const { username, password, pin } = config.plaid;

export class Bank {
  plaidClient;
  accessToken;
  isAuthenticated = false;

  constructor() {
    const { clientID, secret, environment } = config.plaid;
    let env = plaid.environments[environment];
    this.plaidClient = new plaid.Client({ clientID, secret, env });
  }

  async searchInstitutions(name) {
    const response = await this.plaidClient.searchInstitutionsByName(
      name,
      config.plaid.products,
      config.plaid.countryCodes,
      { include_optional_metadata: true }
    );
    // console.debug("Search Institutions Response:\n", response);
    return response.institutions;
  }

  async getInstitution(institutionId) {
    const response = await this.plaidClient.getInstitutionById(
      institutionId,
      config.plaid.countryCodes,
      { include_optional_metadata: true }
    );
    // console.debug("Institution Response:\n", response);
    return response.institution;
  }

  async beginAuthentication(userId) {
    const response = await this.plaidClient.createLinkToken({
      user: { client_user_id: userId },
      client_name: config.appName,
      country_codes: config.plaid.countryCodes,
      language: config.plaid.language,
      products: config.plaid.products
    });

    // console.debug("Link Token Response:\n", response);
    return response.link_token;
  }

  async completeAuthentication(publicToken) {
    const response = await this.plaidClient.exchangePublicToken(publicToken);
    this.isAuthenticated = true;
    this.accessToken = response.access_token;
    // console.debug("Access Token Response:\n", response);
    return response.access_token;
  }

  async getAccountOwners(accountIds) {
    this._authenticationGuard();
    const account_ids = this._toUniqueArray(accountIds);
    const response = await this.plaidClient.getIdentity(this.accessToken, { account_ids })
    // console.debug("Accounts Owners Response:\n", response);
    return response.accounts;
  }

  async getAccounts() {
    this._authenticationGuard();
    const response = await this.plaidClient.getAccounts(this.accessToken)
    // console.debug("Accounts Response:\n", response);
    return response.accounts;
  }

  async getBalances(accountIds) {
    this._authenticationGuard();
    const account_ids = this._toUniqueArray(accountIds);
    const response = await this.plaidClient.getBalance(this.accessToken, { account_ids })
    // console.debug("Balances Response:\n", response);
    return response.accounts
  }

  async getTransactions(accountIds, startDate, endDate) {
    this._authenticationGuard();
    const account_ids = this._toUniqueArray(accountIds);
    const response = await this.plaidClient.getTransactions(this.accessToken, startDate, endDate, { account_ids })
    // console.debug("Transactions Response:\n", response);
    return response.transactions;
  }

  async refreshTransactions() {
    // TODO: This is much more complicated and requires webhooks to understand when the accounts have been refreshed
    this._authenticationGuard();
    const response = await this.plaidClient.refreshTransactions(this.accessToken);
    // console.debug("Refresh Transactions Response:\n", response);
    return response.request_id;
  }

  _toUniqueArray(values) {
    return _.chain([]).concat(values).uniq().value();
  }

  _authenticationGuard() {
    if (!this.isAuthenticated || !this.accessToken) {
      console.debug("this.isAuthenticated:", this.isAuthenticated);
      console.debug("this.accessToken:", this.accessToken);
      throw new Error(
        `Authentication must be completed before making requests.
         isAuthenticated: ${this.isAuthenticated}
         accessToken: ${this.accessToken}`
      );
    }
  }

}
