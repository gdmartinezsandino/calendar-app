import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {
  translations: any = {};

  constructor(private _http: HttpClient) { }

  use(lang: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      const langPath = `assets/i18n/${lang || 'en'}.json`;
      this._http.get<{}>(langPath).subscribe(
        translation => {
          this.translations = Object.assign({}, translation || {});
          resolve(this.translations);
        },
        error => {
          this.translations = {};
          resolve(this.translations);
        }
      );
    });
  }
}

