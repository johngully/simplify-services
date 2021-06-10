export const transactions = [];
export const envelopes = [];

transactions.push(...[
  { id: "123", account: "0987654321", timestamp: "2021-06-08 14:00:00", amount: 100.00, description: "transaction description ", name: "transaction name 1", note: "transaction note 1", created: "2021-06-08 14:00:01", updated: "2021-06-08 14:01:00" },
  { id: "234", account: "0987654321", timestamp: "2021-06-08 15:00:00", amount: 99.99, description: "transaction description 2", name: "transaction name 2", note: "transaction note 2", envelope: envelopes[1], created: "2021-06-08 15:00:01", updated: "2021-06-08 15:01:00" },
]);

envelopes.push(...[
  { id: "321", targetBalance: 1000.00, currentBalance: 0, name: "envelope name 1", description: "envelope description 1", transactions: [] },
  { id: "432", targetBalance: 999.99, currentBalance: 999.99, name: "envelope name 2", description: "envelope description 2", transactions: [transactions[1]] },
]);
