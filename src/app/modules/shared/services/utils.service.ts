import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { environment } from '@environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as tinycolor from 'tinycolor2';

import { DialogComponent } from '../components/molecules/dialog/dialog.component';

@Injectable()
export class UtilsService {
  private _url: string;
  private pallete: any;

  constructor(
    private _http: HttpClient,
    private dialog: MatDialog,
  ) {
    this._url = environment.apiWeatherUrl;
  }

  handleErrorHttp(response: HttpErrorResponse) {
    if (response.error instanceof ErrorEvent || response.error !== null) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', response.error.message);
      return throwError(response.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${response.status}, ` +
        `body was: ${response.error}`);
      // return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
    }
  }

  showDialog(settings: any): void {
    const dialogRef = this.dialog.open(DialogComponent, settings);
    if (typeof settings.onClose !== 'undefined') {
      dialogRef.afterClosed().subscribe(result => {
        settings.onClose(result);
      });
    }
  }

  getItemLocalStorage(key: string) {
    const storageVal: any = localStorage.getItem(key);
    try {
      return JSON.parse(storageVal);
    } catch (error) {
      return storageVal;
    }
  }

  getCountries() {
    return this._http.get(`${this._url}countries`)
      .pipe(
        catchError(this.handleErrorHttp)
      );
  }

  getCitiesOfCountry(country: string) {
    return this._http.get(`${this._url}cities-by/${country}`)
      .pipe(
        catchError(this.handleErrorHttp)
      );
  }

  renderErrors(errors: any) {
    let template = `<p class="mt-10"><strong>Errores:</strong>`;
    template += `<ul class="mt-10">`;
    errors.forEach((error: any) => {
      template += `<li><p>${error[0]}</p></li>`;
    });
    template += `</ul>`;
    return template;
  }

  validateConfirmPassword(form: FormGroup) {
    const password = form.controls.password.value;
    const confirmPassword = form.controls.confirmPassword.value;

    if (confirmPassword.length <= 0) {
      return null;
    }

    if (confirmPassword !== password) {
      form.controls.confirmPassword.setErrors({
        doesMatchPassword: true
      });

      return {
        doesMatchPassword: true
      };
    }

    form.controls.confirmPassword.clearValidators();
    return null;
  }

  getFormValidationErrors(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      const controlErrors: any = form.get(key)?.errors;
      console.log(key);
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  getFileFromService(method: string, path: string) {
    method = method.split('/')[0];
    path = `${this._url}${method}/get-file/${path}`;
    return path;
  }

  getColorObject(value: any, name: string) {
		const color = tinycolor(value);
		return {
			name: name,
			hex: color.toHexString(),
			darkContrast: color.isLight()
		};
	}
  computeColors(hex: string) {
    // Return array of color objects.
    return [
      this.getColorObject(tinycolor(hex).lighten(52), '50'),
      this.getColorObject(tinycolor(hex).lighten(37), '100'),
      this.getColorObject(tinycolor(hex).lighten(26), '200'),
      this.getColorObject(tinycolor(hex).lighten(12), '300'),
      this.getColorObject(tinycolor(hex).lighten(6), '400'),
      this.getColorObject(tinycolor(hex), '500'),
      this.getColorObject(tinycolor(hex).darken(6), '600'),
      this.getColorObject(tinycolor(hex).darken(12), '700'),
      this.getColorObject(tinycolor(hex).darken(18), '800'),
      this.getColorObject(tinycolor(hex).darken(24), '900'),
      this.getColorObject(tinycolor(hex).lighten(50).saturate(30), 'A100'),
      this.getColorObject(tinycolor(hex).lighten(30).saturate(30), 'A200'),
      this.getColorObject(tinycolor(hex).lighten(10).saturate(15), 'A400'),
      this.getColorObject(tinycolor(hex).lighten(5).saturate(5), 'A700')
    ]
	};

  generateThemeColor(color: string, theme: string) {
    this.pallete = this.computeColors(color);
    for (const color of this.pallete) {
      const key1 = `--theme-${theme}-${color.name}`;
      const value1 = color.hex;
      const key2 = `--theme-${theme}-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    }
  }
}
