import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MccColorPickerModule} from 'material-community-components/color-picker';

import { SharedModule } from '@shared/shared.module';
import * as fromGuards from '@core/guards'
import * as fromComponents from './components';

const routes: Routes = [
  { path: '', component: fromComponents.CalendarComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    MccColorPickerModule
  ],
  providers: []
})

export class CalendarModule { }

