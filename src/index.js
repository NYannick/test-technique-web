import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import EquipmentById from './containers/EquipmentById/EquipmentById'

const store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(reduxThunk))
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div style={{ padding: 50 }}>
                <Switch>
                    <Route path="/" component={App} exact />
                    <Route path="/:id"><EquipmentById /></Route>
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
