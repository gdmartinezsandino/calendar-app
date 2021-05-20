import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { SharedModule } from '@shared/index';
import { TranslationsService } from '@shared/services/translations.service';
import { CoreRouting } from './core.routing';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromStore from './store';

export function setupTranslateFactory(
  service: TranslationsService): Function {
  return () => service.use('en');
}

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreRouting,
    fromStore.CoreStoreModule,
    SharedModule,
    NgScrollbarModule,
  ],
  exports: [...fromComponents.components],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: fromServices.LoggingHttpInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [ TranslationsService ],
      multi: true
    }
  ],
})
export class CoreModule { }
