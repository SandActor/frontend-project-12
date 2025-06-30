import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './store/store.js';
import App from './App.jsx'
import './i18n'
import ErrorBoundary from './components/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </StrictMode>
  </ErrorBoundary>
)
