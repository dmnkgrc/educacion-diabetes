import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user.service';
import { AppState } from '../state/app.state';
import { Store, select } from '@ngrx/store';
import {
  GetCurrentUser,
  GetCurrentUserSuccess,
  GetUsers,
  GetUsersSuccess,
  UserActions,
} from '../actions/user.actions';
import { EUserActions } from '../types/user.types';
import { switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { of, forkJoin } from 'rxjs';
import {
  selectLastUserFetch,
  selectCurrentUser,
  selectUsersState
} from '../selectors/user.selectors';

@Injectable()
export class UserEffects {
  constructor(
    public userService: UserService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {
    console.log('building effects');
  }

  @Effect()
  getCurrentUser$ = this.actions$.pipe(
    ofType<GetCurrentUser>(EUserActions.GetCurrentUser),
    withLatestFrom(
      this.store.select(selectUsersState),
      (action, usersState) => usersState
    ),
    switchMap(({ lastFetch, currentUser }) => {
      if (lastFetch && currentUser) {
        return of(new User(currentUser));
      }
    }),
    switchMap((currentUser: User) => of(new GetCurrentUserSuccess(currentUser)))
  );

  @Effect()
  getUsers$ = this.actions$
  .pipe(
    ofType<GetUsers>(EUserActions.GetUsers),
    switchMap((action) => this.userService.getAllStudents()),
    switchMap((users: User[]) => {
      return of(new GetUsersSuccess(users));
    })
  );

}
