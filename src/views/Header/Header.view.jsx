import _ from 'lodash';
import {
  Link,
  withRouter
} from 'react-router-dom'
import {
  Button
} from 'react-md';
import style from './Header.module.css';
import {injectState, bottle} from './../../lib';
import Media from 'react-media';
import Hamburger from '../Hamburger/Hamburger.view';

const {RES_HUGE, RES_LARGE, links} = bottle.container;

const MenuLink = ({url, label}) => (<div>
  <Link className={style['MenuLink']} to={url}>{label}</Link>
</div>)

export default injectState(withRouter(({state, effects, history, match}) => {
  return (<div className={style['Header']}>
  <h1 className={style['head']}>EdelTrader</h1>
    <Media query={{maxWidth:RES_LARGE }} render={() => (<div className={style.menuH}>
      <Hamburger/>
      {links.map((link, index) => <MenuLink key={`${index}_${link.id}`} {...link}>
      </MenuLink>)}
    </div>)} />
  </div>);
}))


