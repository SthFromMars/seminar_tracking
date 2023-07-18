import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import getStore from './state/store';
import { createHashHistory } from 'history';
import { CookiesProvider } from 'react-cookie';
const history = createHashHistory();
ReactDOM.render(
    <CookiesProvider>
        <Provider store={getStore(history)}>
            <App history={history}/>
        </Provider>
    </CookiesProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
