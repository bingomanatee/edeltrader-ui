const WALLET_DATA = require('./data/wallets');
const ORDER_DATA = require('./data/orders');
const MARKET_DATA = require('./data/markets.json');
const cryptocurrencies = require('cryptocurrencies');
import axios from 'axios';

const USE_STOCK_DATA = false;
import {keyBy, clone} from 'lodash';

export default (bottle) => {

  bottle.factory('walletAPI', () => {
    return () => Promise.resolve(WALLET_DATA);
  })

  bottle.factory('orderAPI', (container) => {
    return () => Promise.all(
      [
       axios.get('/api/orders')
      .then((response) => response.data),
      container.marketAPI()
      ])
      .then((results) => {
        const [orders, markets] = results;
        let mIndex = keyBy(markets, 'pk');
        return orders.map((order) => {
          let orderMarket = mIndex[order.market_id];
          if (orderMarket) {
            let {exchange, symbol} = orderMarket;
            let [currencySymbol, currencySymbol2] = symbol.split('/');
            let [currencyName, currencyName2] = [currencySymbol, currencySymbol2].map(s => s === 'USD' ? 'Dollars' :  cryptocurrencies[s]);

            return {exchange, symbol, currencySymbol, currencySymbol2, currencyName, currencyName2, ...order};
          } else {
            console.log('cannot find market ', order.market_id);
          }
          return order;
        });
      });
  });

  let realMarketData = false;
  bottle.factory('marketAPI', () => {
    if (realMarketData) {
      return () => Promise.resolve(realMarketData);
    } else if (USE_STOCK_DATA) {
      return () => Promise.resolve(MARKET_DATA);
    } else {
      return () => axios.get('/api/markets')
        .then((response) => {
          realMarketData = response.data;
          setTimeout(() => realMarketData = false, 60000);
          return realMarketData;
        });
    }
  });

  bottle.factory('svgPathForSymbol', () => (symbol) => {
    return `/react/static/images/cc-icons/color/${symbol.toLowerCase()}.svg`;
  });

  bottle.factory('ccySVGAPI', (container) => {
    return (symbol) => axios.get(container.svgPathForSymbol(symbol),
      {responseType: 'text'})
  });

}
