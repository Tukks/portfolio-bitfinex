import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { GraphWalletComponent } from './component/graph-wallet/graph-wallet.component';
// Todo implements canActivate
const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'wallet',
        component: GraphWalletComponent
    }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
