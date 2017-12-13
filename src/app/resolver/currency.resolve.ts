import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class CurrencyResolve implements Resolve<any> {
  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {}
  getPushSubscribe() {

  }
  resolve(route: ActivatedRouteSnapshot) {
    return this.db
      .collection('users')
      .doc(this.auth.auth.currentUser.uid)
      .collection('currency')
      .doc(route.paramMap.get('currency'))
      .collection('total', ref => ref.orderBy('date', 'desc').limit(300))
      .valueChanges()
      .take(1);
  }
}
