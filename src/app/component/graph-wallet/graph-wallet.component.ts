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
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';
import * as vis from 'vis';
declare var jQuery: any;

import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from '@angular/router/src/config';
import { CurrencyResolve } from '../../resolver/currency.resolve';
// TODO check if value
// TODO Supprimer données quand l'user n'en veut plus
@Component({
  selector: 'app-graph-wallet',
  templateUrl: './graph-wallet.component.html',
  styleUrls: ['./graph-wallet.component.scss']
})
export class GraphWalletComponent implements AfterViewInit, OnDestroy {
  objectKeys = Object.keys;

  title = 'Overview';
  pushSubscribe: Subscription;
  graph2d: any;
  statistique = {};
  dataset = new vis.DataSet({});
  container: HTMLElement;
  routeSubscription: Subscription;
  // Configuration for the Graph
  options: any = {
    yAxisOrientation: 'right',
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
    private resolver: CurrencyResolve,
    private router: Router
  ) {
    this.routeSubscription = this.route.data.subscribe((data: Data) => {
      if (this.pushSubscribe) {
        this.pushSubscribe.unsubscribe();
      }
      this.dataset.clear();
      this.setPortfolioGraphInit(data['wallet']);
      this.title = this.route.snapshot.paramMap.get('currency');
      this.setPortfolioGraphPush(this.route.snapshot.paramMap.get('currency'));
    });
  }
  /************************ Graph ************************/
  ngAfterViewInit() {
    this.container = document.getElementById('graph');
    let groups = new vis.DataSet();
    groups.add({
      id: 0,
      style: 'stroke: #C6D4FF;'
    });
    this.graph2d = new vis.Graph2d(
      this.container,
      this.dataset,
      groups,
      this.options
    );
  }
  /************************ Data ************************/

  /**
   * cette methode reagit au push de firebase de nouvelle données, on ajoute
   * les elements au dataset
   */
  private setPortfolioGraphPush(currency: string) {
    this.pushSubscribe = this.resolver
      .getPushSubscribe(currency)
      .subscribe(last => {
        last.forEach(c => {
          this.dataset.add({
            x: new Date(c.date),
            y: Number(Math.ceil(c.total)),
            group: 0
          });
        });
        this.calcStatistique();
      });
  }

  /**
   * Recupere les 300 derniéres données les données presente dans firebase et init le Dataset
   * TODO a typer
   */
  private setPortfolioGraphInit(data) {
    let dataSetTmp = data.map(c => {
      return {
        x: new Date(c.date),
        y: Number(Math.ceil(c.total)),
        group: 0
      };
    });
    this.dataset.add(dataSetTmp);
    this.calcStatistique();
  }
  // TODO Catch
  public removeData(currency: string) {
    this.resolver
      .removeCurrency('currency')
      .then(() => {
        jQuery('#removeModal').modal('hide');
        this.router.navigate(['']);
      })
      .catch(() => null);
  }
  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.pushSubscribe.unsubscribe();
  }

  private calcPercentage(
    type: 'hours' | 'day' | 'week' | 'month' | 'year' | 'all'
  ) {
    let filteredDataSet = new vis.DataSet(
      this.dataset.get({
        filter: function(item) {
          if (type !== 'all') {
            return moment(item.x).isAfter(moment().subtract(1, type));
          } else {
            return item;
          }
        }
      })
    );
    let max = filteredDataSet.max('x');
    let min = filteredDataSet.min('x');
    if (max && min) {
      return {
        percentage: Number(Math.ceil((max['y'] - min['y']) / min['y'] * 100)),
        total: max['y'] - min['y']
      };
    }
  }
  private calcTotalAsset() {
    let max = this.dataset.max('x');
    if (max) {
      return { total: max['y'] };
    }
  }
  private calcStatistique() {
    this.statistique = {
      hours: this.calcPercentage('hours'),
      day: this.calcPercentage('day'),
      week: this.calcPercentage('week'),
      month: this.calcPercentage('month'),
      year: this.calcPercentage('year'),
      all: this.calcPercentage('all'),
      total: this.calcTotalAsset()
    };
  }
}
