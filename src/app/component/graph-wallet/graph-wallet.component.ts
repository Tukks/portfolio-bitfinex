import { Observable } from 'rxjs/Rx';
import { Component, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/last';
import {
  AngularFireDatabase,
  AngularFireList,
  SnapshotAction,
  AngularFireAction,
  ChildEvent
} from 'angularfire2/database';
import * as vis from 'vis';
import * as moment from 'moment';
@Component({
  selector: 'app-graph-wallet',
  templateUrl: './graph-wallet.component.html',
  styleUrls: ['./graph-wallet.component.css']
})
export class GraphWalletComponent implements AfterViewInit, OnDestroy {
  itemPortfolioInit: AngularFireList<any>;
  itemPortfolioPush: AngularFireList<any>;
  graph2d: any;
  options: any;
  dataset = new vis.DataSet({});

  constructor(private db: AngularFireDatabase, private element: ElementRef) {
    this.setPortfolioGraphInit();
    this.setPortfolioGraphPush();
  }

  ngAfterViewInit() {
    /************************ Graph ************************/
    let container = document.getElementById('graph');

    // Configuration for the Graph
    this.options = {
      moveable: true,
      zoomable: true,
      height: '400px',
      width: '800px'
    };
    // Create a graph2d
    this.graph2d = new vis.Graph2d(container, this.dataset, this.options);
  }
  /************************ Data ************************/

  /**
   * cette methode reagit au push de firebase de nouvelle données, on ajoute
   * les elements au dataset
   */
  private setPortfolioGraphPush() {
    // recupere seulement les derniers elements ajouté. grace a la query limitToLast
    this.itemPortfolioPush = this.db.list('/portfolio/totalByTime', ref =>
      ref.orderByKey().limitToLast(1)
    );
    this.itemPortfolioPush
      .valueChanges()
      .subscribe((changes: [{ date; totalForTime }]) => {
        changes.forEach(c => {
          this.dataset.add({
            x: moment(new Date(Number(c.date))).format('YYYY-MM-DD HH:mm'),
            y: Number(Math.ceil(c.totalForTime))
          });
        });
      });
  }

  /**
   * Recupere TOUTES les données presente dans firebase et init le Dataset
   */
  private setPortfolioGraphInit() {
    this.itemPortfolioInit = this.db.list('/portfolio/totalByTime');
    // Get all value from firebase, only once (take(1)), the next subscribe  listen for new element
    this.itemPortfolioInit
      .valueChanges()
      .take(1)
      .subscribe(changes => {
        changes.forEach(c => {
          this.dataset.add({
            x: moment(new Date(Number(c.date))).format('YYYY-MM-DD HH:mm'),
            y: Number(Math.ceil(c.totalForTime))
          });
        });
      });
  }

  ngOnDestroy(): void {}

}
