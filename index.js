
const BitBayApi = (options) => {
  const PublicApi = require('./publicApi')();
  const PrivateApi = require('./privateApi')(options);

  const getTrades = (currency1, currency2) => {
    return PublicApi.makeRequest('trades', currency1, currency2);
  };

  const getOrderbook = (currency1, currency2, usePrivate = true) => {
    if (usePrivate) {
      return PrivateApi.makeRequest('orderbook', {
        order_currency: currency1,
        payment_currency: currency2
      });
    }

    return PublicApi.makeRequest('orderbook', currency1, currency2);
  };

  const getMarket = (currency1, currency2) => {
    return PublicApi.makeRequest('market', currency1, currency2);
  };

  const getTicker = (currency1, currency2) => {
    return PublicApi.makeRequest('ticker', currency1, currency2);
  };

  const getAll = (currency1, currency2) => {
    return PublicApi.makeRequest('all', currency1, currency2);
  };

  const getInfo = (currency = null) => {
    return PrivateApi.makeRequest('info', { currency });
  };

  const createTrade = (type, currency, amount, payment_currency, rate) => {
    return PrivateApi.makeRequest('trade', {
      type,
      currency,
      amount,
      payment_currency,
      rate
    });
  };

  const cancelTrade = (id) => {
    return PrivateApi.makeRequest('cancel', { id });
  };

  const getOrders = (limit = null) => {
    return PrivateApi.makeRequest('orders', { limit });
  };

  const createTransfer = (currency, quantity, address) => {
    return PrivateApi.makeRequest('transfer', { currency, quantity, address });
  };

  const createWithdrawal = (currency, quantity, account, express, bic) => {
    return PrivateApi.makeRequest('withdraw', {
      currency,
      quantity,
      account,
      express,
      bic
    });
  };

  const getHistory = (currency, limit = null) => {
    return PrivateApi.makeRequest('history', {
      currency,
      limit
    });
  };

  const getTransactions = (currency1 = null, currency2 = null) => {
    let market = null;

    if (currency1 != null && currency2 != null) {
      market = `${currency1.toUpperCase()}-${currency2.toUpperCase()}`;
    }

    return PrivateApi.makeRequest('transactions', { market });
  };

  return {
    getTrades,
    getOrderbook,
    getMarket,
    getTicker,
    getAll,
    getInfo,
    createTrade,
    cancelTrade,
    getOrders,
    createTransfer,
    createWithdrawal,
    getHistory,
    getTransactions,
  };
};

module.exports = BitBayApi;
