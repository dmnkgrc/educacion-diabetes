import { User } from '../../models/user.model';

export interface UserState {
  byId: any;
  currentUser: User;
  lastFetch: string;
}

export const initialUserState: UserState = {
  byId: {},
  currentUser: null,
  lastFetch: null
};
