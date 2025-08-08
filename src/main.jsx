import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';  // <-- Import this
import './index.css';
import App from './App.jsx';
import { store } from './store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>   {/* <-- Wrap App with BrowserRouter */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
