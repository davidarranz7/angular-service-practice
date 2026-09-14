import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.error('No autorizado');
      } else if (error.status === 404) {
        console.error('Recurso no encontrado');
      } else if (error.status === 500) {
        console.error('Error interno del servidor');
      } else {
        console.error(`Error HTTP: ${error.status}`);
      }
      return throwError(() => error);
    }),
  );
};
