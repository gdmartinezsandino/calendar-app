import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { Reminder } from '@interfaces/reminder';
import * as fromServicesShared from '@shared/services';
import * as fromStore from '@calendar/store';

@Component({
  selector: 'calendar-app-reminder',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit {
  public isLoading$: Observable<boolean>;

  @Input() reminder: Reminder;
  public reminderEditForm: FormGroup;

  constructor(
    private _store: Store<fromStore.CalendarState>,
    private _formBuilder: FormBuilder,
    private _utils: fromServicesShared.UtilsService,
    public translate: TranslateService
  ) {
    this.isLoading$ = this._store.pipe(select(fromStore.getLoading));

    this.reminderEditForm = this._formBuilder.group({
      id: [''],
      text: ['', [Validators.required, Validators.maxLength(30)]],
      dateTime: ['', Validators.required],
      color: ['', ''],
      city: ['', ''],
    });
  }

  ngOnInit() { }

  editReminder(reminder: Reminder) {
    this.reminderEditForm.patchValue({
      ...reminder
    });

    const content: any = {
      width: '550px',
      data: {  
        title: this.translate.instant('reminder-modal-edit-form-title'),
        confirm: true,
        form: [
          {
            name: 'text',
            label: this.translate.instant('reminder-modal-form-text-label'),
            type: 'text',
            required: true,
            errorMessage: this.translate.instant('form-field-required-error'),
          },
          {
            name: 'dateTime',
            label: this.translate.instant('reminder-modal-form-date-label'),
            type: 'date',
            required: true,
            errorMessage: this.translate.instant('form-field-required-error'),
          },
          {
            name: 'color',
            label: this.translate.instant('reminder-modal-form-color-label'),
            type: 'text',
            errorMessage: this.translate.instant('form-field-required-error'),
          },
          {
            name: 'city',
            label: this.translate.instant('reminder-modal-form-city-label'),
            type: 'text',
            errorMessage: this.translate.instant('form-field-required-error'),
          },
        ],
        model: this.reminderEditForm.value,
        formElement: this.reminderEditForm,
        onChange: (model: any) => {
          this.reminderEditForm.patchValue(model);
        },
      },
      onClose: (result: any) => {
        if (result.action) {
          this._store.dispatch(new fromStore.EditReminder(this.reminderEditForm.value));
        }
        this.reminderEditForm.reset();
      },
    }
    this._utils.showDialog(content);
  }

  deleteReminder(reminderId: string) {
    const content: any = {
      width: '350px',
      data: {  
        title: this.translate.instant('reminder-modal-delete-title'),
        message: this.translate.instant('reminder-modal-delete-message'),
        confirm: true,
      },
      onClose: (result: any) => {
        if (result.action) {
          this._store.dispatch(new fromStore.DeleteReminder(reminderId));
        }
      },
    }
    this._utils.showDialog(content);
  }
}
