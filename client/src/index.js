import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
//provider is going to keep track o fthat store which is global state
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
//添加svg背景
import './index.css'

const store =createStore(reducers, compose(applyMiddleware(thunk)));
console.log("Store info:"+store.getState())
ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,

       

 document.getElementById('root')
);