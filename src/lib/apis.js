const WALLET_DATA = require('./data/wallets');
const ORDER_DATA = require('./data/orders');
import axios from 'axios';

export default (bottle) => {

  bottle.factory('walletAPI', () => {
    return () => Promise.resolve(WALLET_DATA);
  })

  bottle.factory('orderAPI', () => {
    return () => Promise.resolve(ORDER_DATA);
  })

  bottle.factory('svgPathForSymbol', () => (symbol) => {
    return `/static/images/cc-icons/color/${symbol.toLowerCase()}.svg`;
  });

  bottle.factory('ccySVGAPI', (container) => {
    return (symbol) => axios.get(container.svgPathForSymbol(symbol),
      {responseType: 'text'})
  });

}