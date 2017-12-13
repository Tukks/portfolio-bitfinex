import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.route';
import { AdditionalInfoComponent } from './component/additional-info/additional-info.component';
import { GraphWalletComponent } from './component/graph-wallet/graph-wallet.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './guards/auth-guard';
import { AuthService } from './services/auth.service';
import { MenuComponent } from './component/menu/menu.component';
import { OverviewResolve } from './resolver/overview.resolve';
import { CurrencyResolve } from './resolver/currency.resolve';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GraphWalletComponent,
    AdditionalInfoComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard, OverviewResolve, CurrencyResolve],
  bootstrap: [AppComponent]
})
export class AppModule {}
