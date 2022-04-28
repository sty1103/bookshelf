

export type LoginReqType = {
  email: string,
  pwd: string,
  navigate: any
}

export interface AuthState {
  token: string | null,
  loading: boolean,
  error: Error | null
}

export interface RootState {
  auth: AuthState
}