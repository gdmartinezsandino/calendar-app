import { Action } from '@ngrx/store';

export enum SharedActionTypes {
  ErrorAlert = '[Core] ErrorAlert',
}

export class ErrorAlert implements Action {
  readonly type = SharedActionTypes.ErrorAlert;

  constructor(public payload: string) {}
}

export type SharedActions =
  | ErrorAlert;
