import { Pipe, PipeTransform } from '@angular/core';
import { TranslationsService } from '../../services/translations.service';
@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  constructor(private translate: TranslationsService) {}
  transform(key: any): any {
    return this.translate.translations[key] || key;
  }
}
