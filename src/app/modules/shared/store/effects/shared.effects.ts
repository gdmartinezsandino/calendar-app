import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';

import * as fromServices from '@shared/services';
import * as fromActions from '../actions/shared.actions';

@Injectable()
export class SharedEffects {
  errorAlert$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.SharedActionTypes.ErrorAlert),
      map((action: fromActions.ErrorAlert) => action.payload),
      tap((message) => {
        const content = {
          width: '350px',
          data: {
            title: 'Alert',
            message: message,
            alert: true
          }
        }
        this._utils.showDialog(content);
      })
    )
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private _utils: fromServices.UtilsService,
  ) { }
}
