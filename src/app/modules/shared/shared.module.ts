import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'ngx-moment';

import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import * as fromPipes from './pipes';
import * as fromServices from './services';
import * as fromComponents from './components'

const ComponentsMaterial = [
  MatFormFieldModule, MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule,
  MatNativeDateModule, MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule,
  MatMenuModule, MatSidenavModule, MatListModule, MatCardModule, MatStepperModule,
  MatTabsModule, MatExpansionModule, MatButtonModule, MatChipsModule, MatIconModule,
  MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule, MatTooltipModule,
  MatSnackBarModule, MatTableModule, MatSortModule, MatPaginatorModule, MatToolbarModule,
  MatBottomSheetModule, MatButtonToggleModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MomentModule,
    ...ComponentsMaterial,
  ],
  declarations: [
    ...fromComponents.components,
    ...fromPipes.pipes,
  ],
  exports: [
    ...ComponentsMaterial,
    ...fromComponents.components,
    ...fromPipes.pipes,
  ],
  providers: [
    ...fromServices.services,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'auto' } },
    { provide: MAT_DATE_LOCALE, useValue: 'en-EN' },
  ],
  entryComponents: [...fromComponents.components],
})

export class SharedModule {}
