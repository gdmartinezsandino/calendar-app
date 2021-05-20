import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

import * as fromServicesShared from '@shared/services';
import * as fromActionsShared from '@shared/store';
import * as fromServices from '../../services';
import * as fromActions from '../actions/calendar.actions';

@Injectable()
export class CalendarEffects {
  getCalendar$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(fromActions.ActionTypes.GetCalendar),
        map((action: fromActions.GetCalendar) => action),
        exhaustMap(() => {
          return this._service.getCalendar().pipe(
            map((response: any) => new fromActions.SetCalendar(response.calendar)),
            catchError(error => of(new fromActionsShared.ErrorAlert(error)))
          )
        })
      )
    });

  updateCalendar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.ActionTypes.UpdateCalendar),
      map((action: fromActions.UpdateCalendar) => action.payload),
      exhaustMap((userToUpdate: any) =>
        this._service.updateCalendar(userToUpdate).pipe(
          map((response: any) => new fromActions.UpdateCalendarSuccess(response)),
          catchError(error => of(new fromActions.UpdateCalendarFailed(error)))
        )
      )
    )
  });

  updateCalendarSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.ActionTypes.UpdateCalendarSuccess),
      map((action: fromActions.UpdateCalendarSuccess) => action.payload),
      tap((response: any) => {
        const content = {
          width: '350px',
          data: {
            title: 'Alert',
            message: response.message,
            alert: true
          }
        }
        this._utils.showDialog(content);
      })
    )
  }, { dispatch: false });

  updateCalendarFailed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.ActionTypes.UpdateCalendarFailed),
      map((action: fromActions.UpdateCalendarFailed) => action.payload),
      tap((response: any) => {
        const content = {
          width: '350px',
          data: {
            title: 'Alert',
            message: response,
            alert: true
          }
        }
        this._utils.showDialog(content);
      })
    )
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private _service: fromServices.CalendarService,
    private _utils: fromServicesShared.UtilsService,
  ) { }
}
