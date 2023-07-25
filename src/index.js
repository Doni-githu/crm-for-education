import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './components/App/App';
import { Provider } from './provider/provider';
import { disableReactDevTools } from "@fvilers/disable-react-devtools"

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

