import { UserState, initialUserState } from './user.state';

export interface AppState {
  users: UserState;
}

export const initialAppState: AppState = {
  users: initialUserState
};

export function getInitialState(): AppState {
  return initialAppState;
}
