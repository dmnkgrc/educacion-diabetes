import { AppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { UserState } from '../state/user.state';
import { User } from 'src/app/models/user.model';

export const selectUsersState = (state: AppState) => state.users;

export const selectCurrentUser = createSelector(
  selectUsersState,
  (state: UserState) => state.currentUser
);

export const selectLastUserFetch = createSelector(
  selectUsersState,
  (state: UserState) => state.lastFetch
);

export const selectAllUsers = createSelector(
  selectUsersState,
  (state: UserState) => state.users
);

export const selectAllUsersById = createSelector(
  selectUsersState,
  (state: UserState) => {
    const byId: { [id: string]: User } = {};
    if (!state.users) { return byId; }
    state.users.forEach(user => {
      byId[user.user_id] = user;
    });
    return byId;
  }
);
