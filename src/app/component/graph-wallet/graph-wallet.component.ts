import 'rxjs/add/operator/last';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';
import * as vis from 'vis';

import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Data } from '@angular/router/src/config';
import { CurrencyResolve } from '../../resolver/currency.resolve';
// TODO check if value
@Component({
  selector: 'app-graph-wallet',
  templateUrl: './graph-wallet.component.html',
  styleUrls: ['./graph-wallet.component.css']
})
export class GraphWalletComponent
  implements AfterViewInit, OnInit, OnDestroy, OnChanges {
  objectKeys = Object.keys;

  title = 'Overview'; 
  // itemPortfolioPush: AngularFirestoreCollection<any>;
  pushSubscribe: Subscription;
  graph2d: any;
  statistique = {};
  dataset = new vis.DataSet({});
  container: HTMLElement;
  sub;
  // Configuration for the Graph
  options: any = {
    autoResize: false,
    drawPoints: false,
    moveable: true,
    zoomable: true,
    height: '500px',
    width: '100%'
  };
  constructor(
    private auth: AngularFireAuth,
    private element: ElementRef,
    private authService: AuthService,
    private route: ActivatedRoute,
    private resolver: CurrencyResolve
  ) {
    this.sub = this.route.data.subscribe((data: Data) => {
      this.dataset.clear();
      this.setPortfolioGraphInit(data['wallet']);
      this.title = this.route.snapshot.paramMap.get('currency');
      this.setPortfolioGraphPush(this.route.snapshot.paramMap.get('currency'));
    });
  }
  ngOnInit() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
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
  private setPortfolioGraphPush(currency: string) {
    this.resolver.getPushSubscribe(currency).subscribe(last => {
      last.forEach(c => {
        this.dataset.add({
          x: moment(new Date(Number(c.date))).format('YYYY-MM-DD HH:mm:ss'),
          y: Number(Math.ceil(c.total))
        });
      });
      this.statistique = {
      day: this.calcPercentage('day'),
      week: this.calcPercentage('week'),
      month: this.calcPercentage('month'),
      year: this.calcPercentage('year'),
      all: this.calcPercentage('all')
    };
    });
  }

  /**
   * Recupere les 300 derniéres données les données presente dans firebase et init le Dataset
   * TODO a typer
   */
  private setPortfolioGraphInit(data) {
    let dataSetTmp = data.map(c => {
      return {
        x: moment(new Date(Number(c.date))).format('YYYY-MM-DD HH:mm:ss'),
        y: Number(Math.ceil(c.total))
      };
    });
    this.dataset.add(dataSetTmp);
    this.statistique = {
      day: this.calcPercentage('day'),
      week: this.calcPercentage('week'),
      month: this.calcPercentage('month'),
      year: this.calcPercentage('year'),
      all: this.calcPercentage('all')
    };
    // Create a graph2d
    // this.options.start = this.dataset.min('x')['x'];
    // this.options.end = this.dataset.max('x')['x'];
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    // this.pushSubscribe.unsubscribe();
  }

  private calcPercentage(type: 'day' | 'week' | 'month' | 'year' | 'all') {
    let filteredDataSet = new vis.DataSet(this.dataset.get({
      filter: function (item) {
        if (type !== 'all') {
          return moment(item.x).isSame(moment(), type);
        } else {
          return item;
        }
      }
    }));
    let max = filteredDataSet.max('x');
    let min = filteredDataSet.min('x');
    if (max && min) {
      return {
        percentage: Number(Math.ceil(((max['y'] - min['y']) / min['y']) * 100)),
        total: max['y'] - min['y']
      }
    }
  }
}
