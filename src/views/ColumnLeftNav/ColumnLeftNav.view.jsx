import _ from 'lodash';
import {
  Link,
  withRouter
} from 'react-router-dom'
import {
  Button
} from 'react-md';
import style from './ColumnLeftNav.module.css';
import {injectState, bottle} from './../../lib';
import Hamburger from '../Hamburger/Hamburger.view';

const {links} = bottle.container;

const MenuLink = ({url, label}) => (<div>
  <Link className={style['MenuLink']} to={url}>{label}</Link>
</div>)

export default injectState(withRouter(({state, effects, history, match}) => {
  return (<div className={style['ColumnLeftNav']}>
    <div className={style['ColumnLeftNavMenu']}>
      <Hamburger />
      {links.map((link, index) => <MenuLink key={`${index}_${link.id}`} {...link}>
        </MenuLink>)}
    </div>
  </div>);
}))