import { User } from '../../models/user.model';

export interface UserState {
  users: User[];
  currentUser: User;
  lastFetch: string;
}

export const initialUserState: UserState = {
  users: [],
  currentUser: null,
  lastFetch: null
};
