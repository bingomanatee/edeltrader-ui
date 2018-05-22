import _ from 'lodash';
import {
  Link,
  withRouter
} from 'react-router-dom'
import {
  Button
} from 'react-md';
import style from './Orders.module.css';
import {injectState} from './../../lib';
import {Column, Table} from 'react-virtualized';
import NaturalInt from '../NaturalInt/NaturalInt.view';
import CurrencyIcon from './../CurrencyIcon/CurrencyIcon.view';
import DateTime from '../DateTime/DateTime.view';
import {Component} from 'react';

const _getNaturalInt = (props) => {
  const {cellData} = props;
  return <NaturalInt value={cellData}/>
}

const _getCurrencyIcon = (props) => {
  const {cellData} = props;
  return <CurrencyIcon symbol={cellData} height={20}/>;
}

const _getDate = (props) => {
  const {cellData} = props;
  console.log('making date with ', cellData);
  return <DateTime value={cellData}/>;
}

const _getPercent = (props) => {
  const {cellData} = props;
  return <div>
    {Math.round(100 * cellData)}%
  </div>
}

export default injectState(withRouter(class Orders extends Component {
  render () {
    const {state, effects, history, match} = this.props;
    const {orders} = state;

    const _getRow = (index) => {
      return orders[index.index] || {};
    }

    const SCALE = 0.75;
    return (<div className={style['Orders']}>
      <h2 className={style['headSub']}>Orders</h2>
      {orders && orders.length ? <Table rowGetter={_getRow} rowHeight={35} rowCount={orders.length}
                                        headerHeight={35}
                                        headerClassName={style.tableHead}
                                        rowClassName={style.tableRow}
                                        headerStyle={({'textTransform': 'none'})}
                                        gridStyle={({outline: 'transparent'})}
                                        height={300} width={1460 * SCALE}>

        <Column label=" " dataKey="currencySymbol" width={50 * SCALE}
                cellRenderer={_getCurrencyIcon}/>
        <Column label="Currency" dataKey="currencyName" width={200 * SCALE} className={style.tableCell}/>

        <Column label="Type" dataKey="type" width={100 * SCALE} className={style.tableCell}/>

        <Column label=" " dataKey="currencySymbol2" width={50 * SCALE}
                cellRenderer={_getCurrencyIcon}/>
        <Column label="Against" dataKey="currencyName2" width={200 * SCALE} className={style.tableCell}/>

        <Column label="Amount" dataKey="amount" width={150 * SCALE} className={style.tableCellNumeric}
                headerClassName={style.tableHeadNumeric}
                cellRenderer={_getNaturalInt}
        />
        <Column label="Price" dataKey="price" width={200 * SCALE} className={style.tableCellNumeric}
                headerClassName={style.tableHeadNumeric}
                cellRenderer={_getNaturalInt}
        />
        <Column label="Cost" dataKey="cost" width={200 * SCALE} className={style.tableCellNumeric}
                headerClassName={style.tableHeadNumeric}
                cellRenderer={_getNaturalInt}
        />
        <Column label="Created" dataKey="created_at" width={200 * SCALE} className={style.tableCell}
                cellRenderer={_getDate}
        />
        <Column label="Complete" dataKey="complete" width={150 * SCALE} className={style.tableCellNumeric}
                cellRenderer={_getPercent}
        />
      </Table> : ''}
    </div>);
  }

  componentDidMount () {
    this.props.effects.loadOrders();
  }
}));
