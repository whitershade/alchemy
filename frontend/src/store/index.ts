import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

import reducer from '../reducers';

const windowIfDefined = typeof window === 'undefined' ? null : window as any;
const composeEnhancer = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancer(
    applyMiddleware(
      thunk
    )
  )
);