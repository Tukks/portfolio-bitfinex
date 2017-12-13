import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class OverviewResolve implements Resolve<any> {

  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth) {}
    getPushSubscribe(): AngularFirestoreCollection<{}> {
     return this.db
      .collection('users')
      .doc(this.auth.auth.currentUser.uid)
      .collection('totalWallet', ref => ref.orderBy('date', 'desc').limit(1));
    }
  resolve(route: ActivatedRouteSnapshot) {
    return this.db
    .collection('users')
    .doc(this.auth.auth.currentUser.uid)
    .collection('totalWallet', ref => ref.orderBy('date', 'desc').limit(300))
    .valueChanges()
    .take(1);
  }
}
