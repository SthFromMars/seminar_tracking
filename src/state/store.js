import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default function (history) {
    const middlewares = applyMiddleware(routerMiddleware(history), thunk);

    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    /* eslint-enable */

    const store = createStore(reducers, composeEnhancers(middlewares));

    return store;
}
