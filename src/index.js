import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createWsActions } from './helpers/actionCreators';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';

const ws = new WebSocket('ws://xo.t.javascript.ninja/games');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const action = createWsActions(data);
  store.dispatch(action);
}
  
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,  
  document.getElementById('root')
);

export default ws;
