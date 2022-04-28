import { takeEvery, put, call, select } from 'redux-saga/effects';
import { Action, createActions, handleActions } from 'redux-actions';
import { LoginReqType, AuthState } from '../../types';
import UserService from '../../services/UserService';
import TokenService from '../../services/TokenService';
import { RootState } from '../../types';

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
    ...state,
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

function* loginSaga(action: any) {
  try {
    yield put(pending());
    // const token: string = yield call(UserService.login, action.payload);
    const token: string = 'token-blarblar';
    TokenService.set(token);
    yield put(success(token));
    yield call(action.payload.reqData.navigate, '/');
  } catch( error: any ) {
    yield put(fail(new Error(error?.response?.data.error || 'UNKNOWN_ERROR')));
  }
}

function* logoutSaga() {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    // yield call(UserService.logout(), token);
  } finally {
    yield TokenService.remove();
    yield put(success(null));
  }
}

export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}