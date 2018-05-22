import {Component} from 'react';
import style from './App.module.css';
import Media from 'react-media';
import {bottle, wrapComponentWithState} from "../../lib";
import Header from './../Header/Header.view';
import ColumnLeftNav from '../ColumnLeftNav/ColumnLeftNav.view';
import {Route} from 'react-router-dom';
import MainCurrencies from '../MainCurrencies/MainCurrencies.view';
import Orders from '../Orders/Orders.view';
import 'react-virtualized/styles.css'

const {RES_LARGE} = bottle.container;

export default wrapComponentWithState(class AppView extends Component {
  render () {

    return (
      <div className={style['App']}>
        <div className={style['AppFrame']}>
          <Media query={{minWidth: RES_LARGE + 'px'}} render={() => (<div className={style['Column']}>
            <ColumnLeftNav/>
          </div>)}/>
          <div className={style['Main']}>
            <Header/>
            <Media query={{maxWidth: (RES_LARGE - 1) + 'px'}} render={() => (<div className={style['PageOuterFrame']}>
              <Route path="/" exact component={MainCurrencies} />,
              <Route path="/orders" exact component={Orders} />
            </div>)}/>
            <Media query={{minWidth: RES_LARGE + 'px'}} render={() => (<div>
              <Route path="/" exact component={MainCurrencies} />,
              <Route path="/orders" exact component={Orders} />
          </div>)}/>
          </div>
          <Media query={{minWidth: RES_LARGE + 'px'}} render={() => (<div className={style['Column']}>
            right Column
          </div>)}/>
        </div>
      </div>
    );
  }
})
