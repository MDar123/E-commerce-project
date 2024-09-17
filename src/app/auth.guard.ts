import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SellerService } from './services/seller.service';

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService);

  if (localStorage.getItem('seller')) {
    return true;
  }

  // Accessing the current value of the BehaviorSubject
  return sellerService.isSellerLoggedIN;
};
