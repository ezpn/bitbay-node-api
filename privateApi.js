const crypto = require('crypto');
const querystring = require('querystring');
const request = require('request-promise');

const PrivateApi = ({ publicKey, secretKey }) => {
  const apiAddress = 'https://bitbay.net/API/Trading/tradingApi.php';
  const hashFunction = 'sha512';
  const hmac = crypto.createHash(hashFunction, secretKey);

  const getTimeInSeconds = () => {
    return new Date().getTime() / 1000;
  };

  const prepareQuerystring = (params) => {
    return querystring.stringify(params);
  };

  const getHeaders = (qs) => {
    hmac.update(qs);

    return [
      `API-Key: ${publicKey}`,
      `API-Hash: ${hmac.digest('hex')}`,
    ];
  };

  const makeRequest = (method, params = {}) => {
    params['method'] = method;
    params.moment = getTimeInSeconds();
    const body = prepareQuerystring(params);
    const headers = getHeaders(qs);

    return request.post(apiAddress, { body, headers });
  };

  return {
    makeRequest,
  };
}
