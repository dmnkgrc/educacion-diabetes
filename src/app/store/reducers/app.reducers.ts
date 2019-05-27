import { ActionReducer, MetaReducer, ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { environment } from 'src/environments/environment';
import { hydrateReducers } from '../state/hydrate.state';
import { userReducers } from './user.reducers';

export function onSyncError(err) {
  console.log(err);
}

export const appReducers: ActionReducerMap<AppState> = {
  users: userReducers,
};
