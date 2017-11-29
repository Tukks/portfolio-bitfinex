import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { GraphWalletComponent } from './component/graph-wallet/graph-wallet.component';
import { AdditionalInfoComponent } from './component/additional-info/additional-info.component';
import { AuthGuard } from './services/auth-guard';
// Todo implements canActivateto redirect to login
export const router: Routes = [
  { path: '', redirectTo: 'wallet', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'wallet', component: GraphWalletComponent, canActivate: [AuthGuard] },
  { path: 'additional_info', component: AdditionalInfoComponent, canActivate: [AuthGuard] }
];
// export const AppRoutes = RouterModule.forRoot(router, {enableTracing: true});
export const AppRoutes = RouterModule.forRoot(router);
