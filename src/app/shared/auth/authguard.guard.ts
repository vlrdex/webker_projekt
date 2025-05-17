import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import {UserService} from '../services/user.service';
import { map, take } from 'rxjs/operators';
import {user as FirebaseUser} from '@angular/fire/auth';
import {User as al} from '../model/User';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(UserService);

  return authService.currentUser.pipe(
    take(1),
    map(user => {
      if (user) {
        return true;
      }

      console.log('Access denied - Not authenticated');
      router.navigate(['/login']);
      return false;
    })
  );
};

export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(UserService);

  return authService.currentUser.pipe(
    take(1),
    map(user => {
      if (!user) {
        return true;
      }

      console.log('Already authenticated, redirecting to home');
      router.navigate(['/home']);
      return false;
    })
  );
};

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(UserService);

  return authService.currentUser.pipe(
    take(1), // Csak az aktuális értéket vesszük figyelembe
    map((user) => {
      if (user) {
        const alma :al = authService.getUserFromLocalStorage();
        return alma.admin;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
  );
};
