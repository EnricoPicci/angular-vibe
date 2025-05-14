import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StateService } from '../services/state.service';
import { map } from 'rxjs/operators';

export const WikiDetailGuard: CanActivateFn = () => {
  const stateService = inject(StateService);
  const router = inject(Router);

  return stateService.selectedWikiCard$.pipe(
    map(card => card ? true : router.createUrlTree(['']))
  );
};
