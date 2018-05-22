import _ from 'lodash';
import {
  Link,
  withRouter
} from 'react-router-dom'
import {
  Button
} from 'react-md';
import style from './DateTime.module.css';
import {injectState} from './../../lib';
import moment from 'moment';

const DEFAULT_FORMAT = 'MMM DD YYYY';

export default injectState(withRouter(({value, format}) => {
  return (<div className={style['DateTime']}>
    {moment(value).format(format || DEFAULT_FORMAT)}
  </div>);
}))
