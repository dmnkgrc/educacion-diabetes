import { initialUserState, UserState } from '../state/user.state';
import { UserActions } from '../actions/user.actions';
import { EUserActions } from '../types/user.types';
import * as moment from 'moment';

export function userReducers(
  state = initialUserState,
  action: UserActions
): UserState {
  switch (action.type) {
    case EUserActions.GetCurrentUserSuccess:
      return {
        ...state,
        currentUser: action.payload,
        lastFetch: moment().format()
      };
    case EUserActions.SetCurrentUser:
      return {
        ...state,
        currentUser: action.payload,
        lastFetch: moment().format()
      };
    case EUserActions.GetUsersSuccess:
      console.log('USER SUCCESS');
      let byId = state.byId;
      console.log('ACTION PAYLOAD', action.payload);
      action.payload.forEach((e: any) => byId = {...byId, [e.id]: e });
      return{
        ...state,
        byId
      };
    default:
      return state;
  }
}
