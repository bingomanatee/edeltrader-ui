import {bottle as fsBottle} from 'freactal-seed';
import SeedFactory from 'freactal-seed';
import init from './init';

const bottle = init();

const {getWrapper, injectState, update} = fsBottle.container;

const Seed = SeedFactory();
const mySeed = new Seed({}, true);
/**
 * actions
 */

mySeed.addObjectAndSetEffect('user', {
  name: "Fred Fakename"
});

mySeed.addArrayPropAndSetEffects('orders');
mySeed.addSideEffect('loadOrders', (effects) => {
  bottle.container.orderAPI()
    .then((data) => {
      console.log('loaded orders:', data);
       effects.setOrders(data);
    });
});

mySeed.addObjectAndSetEffect('wallets', false);
mySeed.addSideEffect('loadWallets', (effects) => {
  bottle.container.walletAPI()
        .then((data) => effects.setWallets(data));
});
mySeed.addObjectAndSetEffect('ccySVGs', {});
mySeed.addStateSideEffect('checkCcySVGs', (effects, state, symbol) => {
  const {ccySVGs} = state;
  console.log('checking symbol', symbol);

  if (ccySVGs.hasOwnProperty(symbol)) {
    console.log('ccySVGs symbol === ', ccySVGs[symbol]);
    // checked, or checking
    return;
  }
  effects.setCcySVG(symbol, '?')
         .then(() => bottle.container.ccySVGAPI(symbol))
         .then((result) => {
           console.log('checked symbol ', symbol, 'result: ', result);
           effects.setCcySVG(symbol, !!result);
         })
         .catch((err) => effects.setCcySVG(symbol, false));
});
mySeed.addStateSideEffect('setCcySVG', (effects, state, symbol, value) => {
  const {ccySVGs} = state;

  let hash = {};
  hash[symbol] = value;
  let nwCcySVGs = Object.assign({}, ccySVGs, hash);

  effects.setCcySVGs(nwCcySVGs);
});


const wrapComponentWithState = getWrapper(mySeed.toHash());
export {injectState, update, wrapComponentWithState, bottle};
