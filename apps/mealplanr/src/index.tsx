import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import rootReducer, { RootState } from './reducers';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

function configureStore(preloadedState: RootState) {
  const middleware = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middleware);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers); // removed: { trace: true, traceLimit: 25 }
  // Combine all parts
  return createStore(rootReducer, preloadedState, composedEnhancers);
}

// Load or set default state based on local storage
const localState = localStorage.getItem('reduxState');
const persistedState = localState
  ? JSON.parse(localState)
  : { reducers: rootReducer };
const store = configureStore(persistedState);

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

ReactDOM.render(
  <React.StrictMode>
    {/* Uses provider to provide access to the store from any component App and within App */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
