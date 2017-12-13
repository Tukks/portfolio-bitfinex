import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { GraphWalletComponent } from './component/graph-wallet/graph-wallet.component';
import { AdditionalInfoComponent } from './component/additional-info/additional-info.component';
import { AuthGuard } from './guards/auth-guard';
import { OverviewResolve } from './resolver/overview.resolve';
import { CurrencyResolve } from './resolver/currency.resolve';
// TODO CanLoad?
export const router: Routes = [
  { path: '', redirectTo: 'graph/overview', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'graph/overview',
    component: GraphWalletComponent,
    canActivate: [AuthGuard],
    resolve: { wallet: OverviewResolve },

  },
  {
    path: 'graph/:currency',
    component: GraphWalletComponent,
    canActivate: [AuthGuard],
    resolve: { wallet: CurrencyResolve }
  },
  {
    path: 'additional_info',
    component: AdditionalInfoComponent,
    canActivate: [AuthGuard]
  }
];
// export const AppRoutes = RouterModule.forRoot(router, {enableTracing: true});
export const AppRoutes = RouterModule.forRoot(router);
