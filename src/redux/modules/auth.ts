import { takeEvery, put, call } from 'redux-saga/effects';
import { Action, createActions, handleActions } from 'redux-actions';
import { LoginReqType } from '../../types';
import UserService from '../../services/UserService';
import TokenService from '../../services/TokenService';

// Types
interface AuthState {
  token: string | null,
  loading: boolean,
  error: Error | null
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null
}

// Actions
const prefix = 'bookshelf/auth';

export const {pending, success, fail} = createActions('PENDING', 'SUCCESS', 'FAIL', { prefix });

// Reducer
const reducer = handleActions<AuthState, string>({
  PENDING: (state) => ({
    ...state,
    loading: true,
    error: null
  }),
  SUCCESS: (state, action) => ({
    token: action.payload,
    loading: false,
    error: null
  }),
  FAIL: (state, action: any) => ({
    ...state,
    loading: false,
    error: action.payload
  })
}, initialState, {prefix});

export default reducer;

// Saga
export const { login, logout } = createActions('LOGIN', 'LOGOUT', { prefix });

function* loginSaga(action: Action<LoginReqType>) {
  try {
    yield put(pending());
    const token: string = yield call(UserService.login, action.payload);
    TokenService.set(token);
    yield put(success(token));
  } catch( error: any ) {
    yield put(fail(new Error(error?.response?.data.error || 'UNKNOWN_ERROR')));
  }
}

function * logoutSaga() {

}

export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}