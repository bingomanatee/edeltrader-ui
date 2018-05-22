import _ from 'lodash';
import {
  Link,
  withRouter
} from 'react-router-dom'
import {
  Button
} from 'react-md';
import style from './ViewName.module.css';
import {injectState} from './../../lib';

export default injectState(withRouter(({state, effects, history, match}) => {
  return (<div className={style['ViewName']}>
    --- view ---
  </div>);
}))

/**
 *
 *
 import {Component} from 'react';
 export default injectState(withRouter(class ViewName extends Component {
  render () {
  const {state, effects, history, match} = this.props;
    return (<div className={style['ViewName']}>
    --- view ---
    </div>);
  }

  componentDidMount() {
    // load from API?
  }
}));
 *
 *
 */

