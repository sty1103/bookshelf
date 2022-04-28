import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import reducer from './modules/reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './modules/rootSaga';
import TokenService from '../services/TokenService';

const create = () => {
  const token = TokenService.get();

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    {
      auth: {
        token,
        loading: false,
        error: null
      }
    },
    composeWithDevTools(applyMiddleware(
      sagaMiddleware
    ))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

export default create;