# BitBay Node.js Trading API

[![Build Status](https://travis-ci.org/ezpn/bitbay-node-api.svg?branch=master)](https://travis-ci.org/ezpn/bitbay-node-api)
[![Greenkeeper badge](https://badges.greenkeeper.io/ezpn/bitbay-node-api.svg)](https://greenkeeper.io/)

Unofficial Bitbay.net cryptocurrency exchange api in JavaScript.

## Example API Usage

```js
const bitbay = require('bitbay-node-api')({
  privateKey: '218r938jr3',
  secretKey: 'asd26a6s4dsdf1sdfdgdfg'
});

bitbay.getTrades('BTC', 'USD')
.then((trades) => {
  console.log('trades', trades);
});

```

## API methods

#### `getTrades(currency1: String, currency2: String = 'USD')` - Get latest trades.

Returns an array of JSON objects, ordered from oldest to newest, maximum is 50, that means default request returns 50 oldest transactions in specified currency. Second currency defaults to USD. 

**Example response:**

```json
[
  {
    "date": 1400230012,
    "price": 446.67,
    "type": "sell",
    "amount": 0.0823241,
    "tid": "5011"
  },
  {
    "date": 1400242310,
    "price": 447.9,
    "type": "buy",
    "amount" :0.158423,
    "tid": "5123"
  }
]
```

#### `getOrderbook(currency1: String, currency2: String = 'USD')` - Get orders from stock market.

Returns an object which consists of 2 keys: bids and asks, which are sequentially arrays of purchase and sell orders.
Units of this arrays are also arrays and consist of 2 elements. The first one is rate, and second is an amount of cryptocurrency in that order.

**Example response:**

```json
{
  "bids": [
    [1055.02, 0.277],
    [1055.01, 0.55270758]
  ],
  "asks": [
    [1077, 0.23983588],
    [1078.5, 0.13815484]
  ]
}
```

#### `getMarket(currency1: String, currency2: String = 'USD')` - Get orders from stock market and latest transactions.

Request which combines two above listed methods. Returns an object, which contains keys bids, asks and transactions.
This method works as in above examples.
This request can also have "since" parameter, which affect to transactions array, and works as in trades method.

**Example response:**

```json
{
  "bids": [
    [1055.02, 0.277],
    [1055.01, 0.55270758]
  ],
  "asks": [
    [1077, 0.23983588],
    [1078.5, 0.13815484]
  ],
  "transactions": [
    {
      "date": 1400230002,
      "price": 446.67,
      "type": "sell",
      "amount": 0.117858,
      "tid": "5010"
    },
    {
      "date": 1400230012,
      "price": 446.67,
      "type": "sell",
      "amount": 0.0823241,
      "tid": "5011"
    },
    {
      "date": 1400242310,
      "price": 447.9,
      "type": "buy",
      "amount": 0.158423,
      "tid": "5123"
    }
  ]
}
```

#### `getTicker(currency1: String, currency2: String = 'USD')` - Gets basic statistics

Returns object where:

- `max` - rate of transaction, which had highest value
- `min` - rate of transaction, which had lowest value
- `last` - rate of last transaction
- `bid` - the most profitable rate of active purchase orders
- `ask` - the most profitable rate of active sell orders
- `vwap` - weighted average from last 24 hours
- `average` - average rate of 3 best sell orders
- `volume` - total currency volume

**Example response:**

```json
{
  "max": 4500,
  "min": 1465,
  "last": 1533,
  "bid": 1513,
  "ask": 1542,
  "vwap": 1524.42,
  "average": 1545.67,
  "volume": 4.54042857
}
```

#### `getAll(currency1: String, currency2: String = 'USD')` - Gets all above information combined.

**Example response:**

```json
{
  "max": 4500,
  "min": 1465,
  "last": 1533,
  "bid": 1513,
  "ask": 1542,
  "vwap": 1524.42,
  "average": 1545.67,
  "volume": 4.54042857,
  "bids": [
    [1055.02, 0.277],
    [1055.01, 0.55270758]
  ],
  "asks": [
    [1077, 0.23983588],
    [1078.5, 0.13815484]
  ],
  "transactions": [
    {
      "date": 1400230002,
      "price": 446.67,
      "type": "sell",
      "amount": 0.117858,
      "tid": "5010"
    },
    {
      "date": 1400230012,
      "price": 446.67,
      "type": "sell",
      "amount": 0.0823241,
      "tid": "5011"
    },
    {
      "date": 1400242310,
      "price": 447.9,
      "type": "buy",
      "amount": 0.158423,
      "tid": "5123"
    }
  ]
}
```

### Sources

- Public API description and implementation based on https://www.bitbay.net/public-api
- Private API description and implementation based on: https://github.com/BitBayNet/API
