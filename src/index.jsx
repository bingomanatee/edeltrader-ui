import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppView from './views/App/App.view';
import {BrowserRouter, Route} from 'react-router-dom'
const root = document.getElementById('root');
const load = () => render((
  <AppContainer>
    <BrowserRouter basename="/react">
      <AppView />
    </BrowserRouter>
  </AppContainer>
), root);

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./views/App/App.view', load);
}

load();
