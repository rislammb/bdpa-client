import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { StoreProvider } from 'easy-peasy';
import store from './store';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <StoreProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>
  // </React.StrictMode>
);
