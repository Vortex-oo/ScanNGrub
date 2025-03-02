import React, { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import store, { persistor } from './store.js'
import './index.css'
import Loading from './components/Loading.jsx'
const App = React.lazy(() => import('./App.jsx'))
import { ErrorBoundary } from "react-error-boundary";
import Error from './components/Error.jsx'

// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary fallback={<Error />}>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <App />
          </PersistGate>
        </Suspense>
      </Provider>
    </ErrorBoundary>

  </StrictMode>
)