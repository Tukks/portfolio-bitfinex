import 'rxjs/add/operator/last';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import * as moment from 'moment';
import * as vis from 'vis';

import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
// TODO put in service push and init, needed to reuse this component for other graph

@Component({
  selector: 'app-graph-wallet',
  templateUrl: './graph-wallet.component.html',
  styleUrls: ['./graph-wallet.component.css']
})
export class GraphWalletComponent implements AfterViewInit, OnDestroy {
  itemPortfolioInit: AngularFirestoreCollection<any>;
  itemPortfolioPush: AngularFirestoreCollection<any>;
  pushSubscribe: Subscription;
  graph2d: any;
  options: any;
  dataset = new vis.DataSet({});
  loading = true;
  container;
  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private element: ElementRef,
    private authService: AuthService
  ) {
    this.setPortfolioGraphInit();
    this.setPortfolioGraphPush();
  }
  /************************ Graph ************************/
  ngAfterViewInit() {
    this.container = document.getElementById('graph');

    // Configuration for the Graph
    this.options = {
      moveable: true,
      zoomable: true,
      height: '500px',
      width: '800px'
    };

  }
  /************************ Data ************************/

  /**
   * cette methode reagit au push de firebase de nouvelle données, on ajoute
   * les elements au dataset
   */
  private setPortfolioGraphPush() {
    // recupere seulement les derniers elements ajouté. grace a la query limitToLast
    this.itemPortfolioPush = this.db
      .collection('users')
      .doc(this.auth.auth.currentUser.uid)
      .collection('totalByTime', ref => ref.orderBy('date', 'desc').limit(1));
    this.pushSubscribe = this.itemPortfolioPush
      .valueChanges()
      .subscribe((changes: [{ date; totalForTime }]) => {
        changes.forEach(c => {
          this.dataset.add({
            x: moment(new Date(Number(c.date))).format('YYYY-MM-DD HH:mm:ss'),
            y: Number(Math.ceil(c.totalForTime))
          });
        });
        this.options.end = this.dataset.max('x')['x'];
        this.graph2d.setWindow(this.options);
      });
  }

  /**
   * Recupere les 300 derniéres données les données presente dans firebase et init le Dataset
   */
  private setPortfolioGraphInit() {
    this.itemPortfolioInit = this.db
      .collection('users')
      .doc(this.auth.auth.currentUser.uid)
      .collection('totalByTime', ref => ref.orderBy('date', 'desc').limit(300));
    // this.itemPortfolioInit = this.db.collection('/portfolio/totalByTime');
    // Get all value from firebase, only once (take(1)), the next subscribe  listen for new element
    this.itemPortfolioInit
      .valueChanges()
      .take(1)
      .subscribe(changes => {
        changes.forEach(c => {
          this.dataset.add({
            x: moment(new Date(Number(c.date))).format('YYYY-MM-DD HH:mm:ss'),
            y: Number(Math.ceil(c.totalForTime))
          });
        });
        // Create a graph2d
        this.options.start = this.dataset.min('x')['x'];
        this.options.end = this.dataset.max('x')['x'];
        // this.graph2d.setOptions(this.options);
        this.graph2d = new vis.Graph2d(this.container, this.dataset, this.options);
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.pushSubscribe.unsubscribe();
  }
}
