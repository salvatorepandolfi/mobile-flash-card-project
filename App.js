import React, {Component} from 'react';
import {createStore} from "redux";
import reducers from './reducers'
import middleware from './middleware'
import {Provider} from "react-redux"
import Main from "./components/Main";


export default class App extends Component {
    render() {
        const store = createStore(reducers, middleware)
        return (
            <Provider store={store}>
                <Main/>
            </Provider>
        )
    }
}

