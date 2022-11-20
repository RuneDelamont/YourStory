import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import authorReducer from './author'
import bookReducer from './book'
import chapterReducer from './chapter'
import pageReducer from './page'
import userReducer from './user';

const rootReducer = combineReducers({
  session,
  authors: authorReducer,
  books: bookReducer,
  chapters: chapterReducer,
  pages: pageReducer,
  users: userReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
