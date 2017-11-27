import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './component/login/login.component';
import { AuthService } from './services/auth.service';
import { GraphWalletComponent } from './component/graph-wallet/graph-wallet.component';
import { AppRoutes } from './app.route';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GraphWalletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserAnimationsModule
  ],
  providers: [AngularFireDatabase, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
