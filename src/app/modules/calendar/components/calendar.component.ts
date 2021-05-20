import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import * as fromServicesShared from '@shared/services';
import * as fromStore from '@calendar/store';
import * as fromStoreCore from '@core/store';

@Component({
  selector: 'ag-support-calendar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  public isLoading$: Observable<boolean>;
  public calendar$: Observable<any>;
  public calendar: any;
  public calendarForm: FormGroup;
  
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public areas: Array<string> = [];
  public filteredAreas!: Observable<string[]>;
  public priorities: Array<string> = [];
  public filteredPriorities!: Observable<string[]>;
  public tags: Array<string> = [];
  public filteredTags!: Observable<string[]>;
  
  constructor(
    private _store: Store<fromStore.CalendarState>,
    private _formBuilder: FormBuilder,
    private _utils: fromServicesShared.UtilsService,
  ) {
    this.isLoading$ = this._store.pipe(select(fromStore.getLoading));
    
    this.calendarForm = this._formBuilder.group({
      logo: ['', ''],
      logotype_accent_bg: ['', ''],
      logo_accent_bg: ['', ''],
      primary_color: ['', ''],
      accent_color: ['', ''],
      areas: ['', ''],
      priorities: ['', ''],
      tags: ['', ''],
    });

    this.calendar$ = this._store.pipe(select(fromStore.getCalendar));
    this.calendar$.subscribe((calendar) => {
      if (calendar) {
        this.calendar = calendar;
        this.areas = this.calendar.areas;
        this.priorities = this.calendar.priorities;
        this.tags = this.calendar.tags;

        this.calendarForm.patchValue({
          ...this.calendar
        });

        this.filteredAreas = this.calendarForm.get('areas')!.valueChanges.pipe(
          startWith(null),
          map((value: string | null) => value ? this._filterOptions(value, 'areas') : this.areas.slice())
        );
    
        this.filteredPriorities = this.calendarForm.get('priorities')!.valueChanges.pipe(
          startWith(null),
          map((value: string | null) => value ? this._filterOptions(value, 'priorities') : this.priorities.slice())
        );

        this.filteredTags = this.calendarForm.get('tags')!.valueChanges.pipe(
          startWith(null),
          map((value: string | null) => value ? this._filterOptions(value, 'tags') : this.tags.slice())
        );
      }
    });
  }

  ngOnInit() { }

  goTo(path: string) {
    this._store.dispatch(new fromStoreCore.Go({
      path: [path]
    }));
  }

  renderImage(path: string) {
    return this._utils.getFileFromService('calendar', path);
  }
  fielUploaded(response: any, field: string) {
    if (field === 'logo') {
      this.calendarForm.patchValue({
        logo: response.path
      });
    } else if (field === 'logotype_accent_bg') {
      this.calendarForm.patchValue({
        logotype_accent_bg: response.path
      });
    } else if (field === 'logo_accent_bg') {
      this.calendarForm.patchValue({
        logo_accent_bg: response.path
      });
    }

    this._store.dispatch(new fromStore.SetCalendar(this.calendarForm.value));
  }
  defaultLogo(field: string) {
    switch(field) {
      case 'logo':
        this.calendarForm.patchValue({
          logo: ''
        });
        break;

      case 'logotype_accent_bg':
        this.calendarForm.patchValue({
          logotype_accent_bg: ''
        });
        break;

      case 'logo_accent_bg':
        this.calendarForm.patchValue({
          logo_accent_bg: ''
        });
        break;
    }
    this._store.dispatch(new fromStore.UpdateCalendar(this.calendarForm.value));
  }

  private _filterOptions(value: string, from: string): any {
    if (typeof value !== 'string') {
      return false;
    }

    const filterValue = value.toLowerCase();
    if (from === 'areas') {
      return this.areas.filter(area => area.toLowerCase().includes(filterValue));
    } else if (from === 'priorities') {
      return this.priorities.filter(priority => priority.toLowerCase().includes(filterValue));
    } else if (from === 'tags') {
      return this.tags.filter(tag => tag.toLowerCase().includes(filterValue));
    } else {
      return [];
    }
  }
  
  selectedOption(event: MatAutocompleteSelectedEvent, from: string): void {
    if (from === 'areas') {
      this.areas.push(event.option.viewValue);
      this.calendarForm.patchValue({
        areas: ''
      });
    } else if (from === 'priorities') {
      this.priorities.push(event.option.viewValue);
      this.calendarForm.patchValue({
        priorities: ''
      });
    } else if (from === 'tags') {
      this.tags.push(event.option.viewValue);
      this.calendarForm.patchValue({
        tags: ''
      });
    }
  }

  addOptionToField(event: MatChipInputEvent, from: string): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (from === 'areas') {
        this.areas = this.areas.concat(value.trim());
      } else if (from === 'priorities') {
        this.priorities = this.priorities.concat(value.trim());
      } else if (from === 'tags') {
        this.tags = this.tags.concat(value.trim());
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    if (from === 'areas') {
      this.calendarForm.patchValue({
        areas: ''
      });
    } else if (from === 'priorities') {
      this.calendarForm.patchValue({
        priorities: ''
      });
    } else if (from === 'tags') {
      this.calendarForm.patchValue({
        tags: ''
      });
    }
  }

  removeOptionToField(option: string, from: string): void {
    let index = 0;
    switch(from) {
      case 'areas':
        index = this.areas.indexOf(option);
        break;

      case 'priorities':
        index = this.priorities.indexOf(option);
        break;

      case 'tags':
        index = this.tags.indexOf(option);
        break;
      
    }

    if (index >= 0) {
      if (from === 'areas') {
        const areasClone = this.areas.slice();
        areasClone.splice(index, 1);
        this.areas = areasClone;
      } else if (from === 'priorities') {
        const prioritiesClone = this.priorities.slice();
        prioritiesClone.splice(index, 1);
        this.priorities = prioritiesClone;
      } else if (from === 'tags') {
        const tagsClone = this.tags.slice();
        tagsClone.splice(index, 1);
        this.tags = tagsClone;
      }
    }
  }

  onUpdate() {
    this.calendarForm.patchValue({
      areas: this.areas,
      priorities: this.priorities,
      tags: this.tags
    });

    if (this.calendarForm.dirty && this.calendarForm.valid) {
      this._store.dispatch(new fromStore.UpdateCalendar(this.calendarForm.value));
    }
  }
}
