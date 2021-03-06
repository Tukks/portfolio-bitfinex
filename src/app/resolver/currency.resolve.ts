import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
// TODO Caching
@Injectable()
export class CurrencyResolve implements Resolve<any> {
  constructor(
    private auth: AngularFireAuth,
    private dbFb: AngularFireDatabase
  ) {}

  removeCurrency(currency: string): Promise<void> {
    return this.dbFb
      .list('users/' + this.auth.auth.currentUser.uid + '/menu/' + currency)
      .remove();
  }
  getHistory(currency: string): Observable<any> {
    return this.dbFb
      .object('users/' + this.auth.auth.currentUser.uid + '/history/' + currency)
      .valueChanges();
  }
  getPushSubscribe(currency: string): Observable<any> {
    return this.dbFb
      .list(
        'users/' + this.auth.auth.currentUser.uid + '/menu/' + currency,
        ref => ref.orderByChild('date').limitToLast(1)
      )
      .valueChanges();
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.dbFb
      .list(
        'users/' +
          this.auth.auth.currentUser.uid +
          '/menu/' +
          route.paramMap.get('currency')
      )
      .valueChanges()
      .take(1);
  }
}
