import ReactSVG from 'react-svg';

export default () => (<ReactSVG
  path="/react/static/images/icons/ic_menu_24px.svg"
  onClick={() => {
    console.log('wrapper onClick')
  }}
/>);
