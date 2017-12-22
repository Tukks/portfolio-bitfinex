import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.route';
import { AdditionalInfoComponent } from './component/additional-info/additional-info.component';
import { GraphWalletComponent } from './component/graph-wallet/graph-wallet.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './guards/auth-guard';
import { AuthService } from './services/auth.service';
import { MenuComponent } from './component/menu/menu.component';
import { CurrencyResolve } from './resolver/currency.resolve';
import { CapitalizePipe } from './pipe/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GraphWalletComponent,
    AdditionalInfoComponent,
    MenuComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard, CurrencyResolve, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule {}
