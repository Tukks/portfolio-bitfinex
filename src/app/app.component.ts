import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Subscription } from "rxjs";
import {
  AngularFireDatabase,
  AngularFireList,
  SnapshotAction,
  AngularFireAction,
  ChildEvent
} from 'angularfire2/database';
import * as vis from 'vis';
import * as moment from 'moment';
// TODO https://gist.github.com/katowulf/6383103 get only Last, replace by orderByKey ??
// TODO replace graph by Vis.js with 2 way databinding http://visjs.org/docs/graph2d/#items or another with stream

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  itemsRef: AngularFireList<any>;
  dataset = new vis.DataSet({});

  constructor(private db: AngularFireDatabase, private element: ElementRef) {}

  ngAfterViewInit() {
    let container = document.getElementById('test');

    // Configuration for the Timeline
    let options = {
      moveable: true,
      zoomable : true,
      start: '2017-11-22',
      end: '2017-11-23'
    };

    // Create a Timeline
    let timeline = new vis.Graph2d(container, this.dataset, options);
    this.itemsRef = this.db.list('/portfolio/totalByTime');
    // Use snapshotChanges().map() to store the key
    this.itemsRef.snapshotChanges(['child_added']).forEach(changes => {
       changes.forEach(c => {
        this.dataset.add({x: moment(new Date(Number(c.key))).format('YYYY-MM-DD HH:mm'), y: Number(Math.ceil(c.payload.val()))});
      });
    });

  }
}
