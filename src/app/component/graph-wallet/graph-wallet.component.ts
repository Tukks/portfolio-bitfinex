import 'rxjs/add/operator/last';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from '@angular/router/src/config';
import { Subscription } from 'rxjs';
import * as vis from 'vis';

import { CurrencyResolve } from '../../resolver/currency.resolve';
import { calcMinMax, calcPercentage, calcTotalAsset, getFirst } from '../../utils/stat-utils';

declare var jQuery: any;

// TODO check if value
// TODO Supprimer les données de date a date
// TODO date sur mobile bug
@Component({
  selector: 'app-graph-wallet',
  templateUrl: './graph-wallet.component.html',
  styleUrls: ['./graph-wallet.component.scss']
})
export class GraphWalletComponent implements AfterViewInit, OnDestroy {
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
    width: '100%',
    dataAxis : {
      right : {
        format: function (value) {
          return value;
        }
      }
    }
  };
  constructor(
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
      style: 'stroke: #1f9e9a;'
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
        y: Number.parseFloat(c.total),
        group: 0
      };
    });
    this.dataset.add(dataSetTmp);
    this.calcStatistique();
  }
  // TODO Catch
  public removeData(currency: string) {
    this.resolver
      .removeCurrency(currency)
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

  private calcStatistique() {
    this.statistique = {
      last_hours: calcPercentage(this.dataset, 'hours'),
      last_day: calcPercentage(this.dataset, 'day'),
      last_week: calcPercentage(this.dataset, 'week'),
      last_month: calcPercentage(this.dataset, 'month'),
      all: calcPercentage(this.dataset, 'all'),
      acquisition_cost: getFirst(this.dataset),
      MIN: calcMinMax(this.dataset, 'min'),
      MAX: calcMinMax(this.dataset, 'max'),
      total: calcTotalAsset(this.dataset)
    };
  }
}
