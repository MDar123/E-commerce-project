import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './check-out/check-out.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'seller-auth',
    component: SellerAuthComponent,
  },
  { path: 'seller-home',
   component: SellerHomeComponent,
   canActivate:[authGuard]
  },
  {
    component: SellerAddProductComponent,
    path:'seller-add-product',
    canActivate:[authGuard]
  },
  {
    component: SellerUpdateProductComponent,
    path:'seller-update-product/:id',
    canActivate:[authGuard]
  },
  {
    path: 'search/:term',
    component: SearchComponent
  },
  {
    path: 'product-detail/:productId',
    component: ProductDetailsComponent
  },
  {
    path: 'user-auth',
    component: UserAuthComponent
  },
  {
    path: 'cart-page',
    component: CartPageComponent
  },
  {
    path: 'check-out',
    component: CheckoutComponent
  },
  {
  path : 'my-orders',
  component: MyOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
