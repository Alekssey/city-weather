import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Root from './Root.js';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Root>
        <App />
    </Root>,
    document.getElementById('root')
);

serviceWorker.unregister();
