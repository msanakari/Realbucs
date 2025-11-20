import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { inject } from '@angular/core';
import { GlobalService } from '../services/global.service';

export function authInterceptorFn(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const gS = inject(GlobalService);

  let modifiedReq = req;

  if (localStorage.getItem('userData')) {
    const userData = JSON.parse(localStorage.getItem('userData')!);

    modifiedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + userData.authToken,
        id: userData.id + '',
      },
    });
  }

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}\nPath: ${req.url}`;
      }

      if (error?.status === 401) {
        // logout logic here
      }

      const customError = {
        error: errorMessage,
        message: error.message,
        path: req.url,
        status: error.status,
        timestamp: new Date().toISOString(),
      };

      return throwError(() => customError);
    })
  );
}
