import { HttpInterceptorFn } from '@angular/common/http';

export const adminHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes('/admin')) {
    return next(req);
  }

  const adminReq = req.clone({
    setHeaders: {
      'X-Admin': 'true',
    },
  });
  return next(adminReq);
};
