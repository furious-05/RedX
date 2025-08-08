import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from "react-router-dom"; // <-- Import this
import './index.css';
import App from './App.jsx';
import { store } from './store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>   {/* <-- Wrap App with BrowserRouter */}
        <App />
      </HashRouter>
    </Provider>
  </StrictMode>
);
