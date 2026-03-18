import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';

export const internalNavigationGuard: CanActivateFn = () => {
  const router = inject(Router);
  const navigationService = inject(NavigationService);

  if (!navigationService.isInternalNavigation()) {
    return router.parseUrl('/');
  }

  return true;
};
