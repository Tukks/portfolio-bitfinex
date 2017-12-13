import 'rxjs/add/operator/last';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { AfterViewInit, Component, ElementRef, OnDestroy, OnChanges, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import * as moment from 'moment';
import * as vis from 'vis';

import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OverviewResolve } from '../../resolver/overview.resolve';
import { Data } from '@angular/router/src/config';
// TODO check if value
// PERFORMANCE!!!
@Component({
  selector: 'app-graph-wallet',
  templateUrl: './graph-wallet.component.html',
  styleUrls: ['./graph-wallet.component.css']
})
export class GraphWalletComponent implements AfterViewInit, OnInit, OnDestroy {
  title = 'Overview';
  itemPortfolioPush: AngularFirestoreCollection<any>;
  pushSubscribe: Subscription;
  graph2d: any;
  dataset = new vis.DataSet({});
  container: HTMLElement;

  // Configuration for the Graph
  options: any = {
    moveable: true,
    zoomable: true,
    height: '500px',
    width: '800px'
  };
  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private element: ElementRef,
    private authService: AuthService,
    private route: ActivatedRoute) {

    // this.setPortfolioGraphPush();
  }
  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.dataset.clear();
      this.setPortfolioGraphInit(data['wallet']);
    });
  }
  /************************ Graph ************************/
  ngAfterViewInit() {
    this.container = document.getElementById('graph');
    this.graph2d = new vis.Graph2d(this.container, this.dataset, this.options);
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
      .collection('totalWallet', ref => ref.orderBy('date', 'desc').limit(1));
    this.pushSubscribe = this.itemPortfolioPush
      .valueChanges()
      .subscribe((changes: [{ date; total }]) => {
        changes.forEach(c => {
          this.dataset.add({
            x: moment(new Date(Number(c.date))).format('YYYY-MM-DD HH:mm:ss'),
            y: Number(Math.ceil(c.total))
          });
        });
        this.options.end = this.dataset.max('x')['x'];
        this.graph2d.setWindow(this.options);
      });
  }

  /**
   * Recupere les 300 derniéres données les données presente dans firebase et init le Dataset
   * TODO a typer
   */
  private setPortfolioGraphInit(data) {
    data.forEach(c => {
      this.dataset.add({
        x: moment(new Date(Number(c.date))).format('YYYY-MM-DD HH:mm:ss'),
        y: Number(Math.ceil(c.total))
      });
    });
    // Create a graph2d
    this.options.start = this.dataset.min('x')['x'];
    this.options.end = this.dataset.max('x')['x'];
  }

  ngOnDestroy(): void {
   // this.pushSubscribe.unsubscribe();
  }
}
