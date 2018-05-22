import Bottle from 'bottlejs';
import APIs from './apis';
export default () => {

  const bottle = new Bottle();

  bottle.constant('RES_LARGE', 1024);
  bottle.constant('RES_SM', 839);
  bottle.constant('RES_TINY', 480);
  bottle.constant('RES_HUGE', 1690);

  bottle.constant('links', [
    {id: 0, label: 'Home', url: '/'},
    {id: 1, label: 'Orders', url: '/orders'}
  ]);

  APIs(bottle);

  return bottle;
}