import { Action } from '@ngrx/store';

export enum ActionTypes {
  GetCalendar = '[Calendar] GetCalendar',
  SetCalendar = '[Calendar] SetCalendar',
  UpdateCalendar = '[Calendar] UpdateCalendar',
  UpdateCalendarSuccess = '[Calendar] UpdateCalendarSuccess',
  UpdateCalendarFailed = '[Calendar] UpdateCalendarFailed',
}

export class GetCalendar implements Action {
  readonly type = ActionTypes.GetCalendar;
}
export class SetCalendar implements Action {
  readonly type = ActionTypes.SetCalendar;

  constructor(public payload: any) {}
}

export class UpdateCalendar implements Action {
  readonly type = ActionTypes.UpdateCalendar;

  constructor(public payload: any) {}
}
export class UpdateCalendarSuccess implements Action {
  readonly type = ActionTypes.UpdateCalendarSuccess;

  constructor(public payload: any) {}
}
export class UpdateCalendarFailed implements Action {
  readonly type = ActionTypes.UpdateCalendarFailed;

  constructor(public payload: any) {}
}

export type CalendarActions =
  | GetCalendar
  | SetCalendar
  | UpdateCalendar
  | UpdateCalendarSuccess
  | UpdateCalendarFailed;
