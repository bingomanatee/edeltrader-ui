const fred = Intl.NumberFormat('en-US');

export default ({value}) => (<span>{fred.format(value)}</span>);