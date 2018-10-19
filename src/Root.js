import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store/index.js';

export default props => {
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}