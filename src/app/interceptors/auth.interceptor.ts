import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap, take } from 'rxjs/operators';

const SKIPPED_PREFIXES = ['/locale/'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (shouldSkip(req.url)) return next(req);

  return authService.getAccessTokenSilently().pipe(
    take(1),
    switchMap(token => {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(authReq);
    })
  );
};

export function shouldSkip(url: string): boolean {
  return SKIPPED_PREFIXES.some(prefix => url.startsWith(prefix));
}
