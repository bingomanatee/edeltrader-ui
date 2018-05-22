import _ from 'lodash';
import {
  withRouter
} from 'react-router-dom'
import style from './MainCurrencies.module.css';
import {injectState} from './../../lib';
import {Column, Table} from 'react-virtualized'
import CurrencyIcon from './../CurrencyIcon/CurrencyIcon.view';
import {Component} from 'react';
import NaturalInt from '../NaturalInt/NaturalInt.view';

const _getNaturalInt = (props) => {
  const {cellData} = props;
  return <NaturalInt value={cellData} />
}

export default injectState(withRouter(class MainCurrencies extends Component {

  render () {
    const {state, effects, history, match} = this.props;
    const cd = this.combinedData();
    const _getRow = (index) => {
      return cd[index.index] || {};
    }

    const _getCurrencyIcon = (props) => {
      const {cellData} = props;
      return <CurrencyIcon symbol={cellData} height={25} />;
    }

    return (
      <div className={style['MainCurrencies']}>
        <h2 className={style['headSub']}>Main Currencies</h2>
        {cd.length ? <Table rowGetter={_getRow}
                            rowHeight={35}
                            rowCount={cd.length}
                            headerHeight={35}
                            tableClassName={style.tableMain}
                            headerClassName={style.tableHead}
                            rowClassName={style.tableRow}
                            height={300} width={600}>
          <Column label=" " dataKey="symbol" width={50}
                  cellRenderer={_getCurrencyIcon}/>
          <Column label="Currency" dataKey="name" width={200} className={style.tableCell}/>
          <Column label="Balance" dataKey="balance" width={300} className={style.tableCellNumeric}
                  headerClassName={style.tableHeadNumeric}
                  cellRenderer={_getNaturalInt}
          />
        </Table> : ''}
      </div>
    );
  }

  combinedData () {
    if (!this.props.state.wallets) {
      return [];
    }

    let out = _(this.props.state.wallets.accounts)
      .map('wallets')
      .flattenDeep()
      .groupBy('symbol')
      .map((walletList) => _.reduce(walletList, (summary, wallet) => {
        if (!summary) {
          return Object.assign({}, wallet);
        }
        summary.balance += wallet.balance;
        return summary;
      }, null))
      .value();
    ''
    return out;
  }

  componentDidMount () {
    this.props.effects.loadWallets();
  }

  componentWillUnmount() {
    this.props.effects.setWallets([]);
  }
}));
