/**
 * @fileoverview HTTP Error Interceptor
 * @description Global error handling for HTTP requests
 * @module core/interceptors
 */

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }

      if (!environment.production) {
        console.error('HTTP Error:', errorMessage, error);
      }

      return throwError(() => error);
    })
  );
};
