import _ from 'lodash';
import {
  Link,
  withRouter
} from 'react-router-dom'
import {
  Button
} from 'react-md';
import style from './CurrencyIcon.module.css';
import {injectState, bottle} from './../../lib';
import ReactSVG from 'react-svg';


import {Component} from 'react';

export default injectState(withRouter(class CurrencyIcon extends Component {
  render () {
    let {state, effects, history, match, symbol, height} = this.props;
    const {ccySVGs} = state;

    if (!height) {
      height = 30;
    }

    if (!symbol) {
      return <div className={style['CurrencyIcon']}>
        !NO SYMBOL!
      </div>
    }
    const viewbox = `0 0 ${height} ${height}`
    return (<div className={style['CurrencyIcon']}>
      {this.hasSVG ? <ReactSVG path={bottle.container.svgPathForSymbol(symbol)}
                               onInjected={(svg) => {
                                 svg.setAttribute('preserveAspectRatio', 'xMinYMin');
                                 svg.setAttribute('transform', `scale(${height/32} ${height/32})`);
                              //   svg.setAttribute('width', height );
                              //   svg.setAttribute('height', height );
                                 // svg.setAttribute('viewBox', viewbox);
                                 svg.setAttribute('viewPort', viewbox);
                               }}
      /> : ''}
    </div>);
  }

  get hasSVG () {
    const {state, symbol} = this.props;
    if (!symbol) {
      return false;
    }
    const {ccySVGs} = state;
    return ccySVGs[symbol] || false;
  }

  componentDidMount () {
    if (this.props.symbol) {
      this.props.effects.checkCcySVGs(this.props.symbol);
    }
  }
}));