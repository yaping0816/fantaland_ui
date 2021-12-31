import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './asset/bootstrap_sketchy.css';
import './asset/additional_styles.css';
import GlobalContext from './context/global_context.js';

ReactDOM.render(
    <React.StrictMode>
        <GlobalContext>
            <div className="bg-image"></div>
            <App></App>
        </GlobalContext>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
