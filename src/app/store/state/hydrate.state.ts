import { Action } from '@ngrx/store';

// tslint:disable-next-line:no-empty-interface
export interface HydratedState {}

export function hydrateReducers(
  state: boolean = false,
  action: Action
): HydratedState {
  return state;
}
