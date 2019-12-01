import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';
import { EUserActions } from '../types/user.types';

export class GetUsers implements Action {
  public readonly type = EUserActions.GetUsers;
}

export class GetUsersSuccess implements Action {
  public readonly type = EUserActions.GetUsersSuccess;
  constructor(public payload: User[]) {}
}

export class GetCurrentUser implements Action {
  public readonly type = EUserActions.GetCurrentUser;
}

export class GetCurrentUserSuccess implements Action {
  public readonly type = EUserActions.GetCurrentUserSuccess;
  constructor(public payload: User) {}
}

export class SaveUser implements Action {
  public readonly type = EUserActions.SaveUser;
  constructor(public payload: User) {}
}

export class SetCurrentUser implements Action {
  public readonly type = EUserActions.SetCurrentUser;
  constructor(public payload: User) {}
}

export type UserActions =
  | GetUsers
  | GetUsersSuccess
  | GetCurrentUser
  | GetCurrentUserSuccess
  | SaveUser
  | SetCurrentUser;
