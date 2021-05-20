import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { Reminder } from '@interfaces/reminder';
import * as fromServicesShared from '@shared/services';

@Injectable()
export class CalendarService {
  private _url: String;
  public reminders: Array<Reminder> = [];

  constructor(
    private _utils: fromServicesShared.UtilsService,
  ) {
    this._url = environment.apiWeatherUrl;
  }

  create(data: Reminder): Reminder {
    return data;
  }

  edit(data: Reminder): Reminder {
    return data;
  }

  list(date: Date): Observable<Reminder[]> {
    console.log(date);
    return of(this.reminders);
  }

  delete(reminderId: string): boolean {
    console.log(reminderId);
    return true;
  }
}
