import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import store from './store/index.js'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary'

const RootWrapper = () => (
  <ErrorBoundary>
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </ErrorBoundary>
)

export default RootWrapper
