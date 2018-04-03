import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Stoper from './Stoper';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Stoper />, document.getElementById('root'));
registerServiceWorker();
