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
import { AuthService } from './services/auth.service';
/**
 * TODO on this screen :
 * ** make graph look like stream but stop on rangechanged and start again when user go to end of data
 * (ou juste un bouton pour revenir a l'état stream)
 * http://visjs.org/examples/graph2d/15_streaming_data.html
 * ** on event rangechanged load more data in past
 * ** ne pas charger toutes les données d'un coup, on va limiter a 1 semaines
 *
 * TODO General :
 * ** add overview wallet, need change on working.js
 * ** add graph par monnaie, need change working.js
 * **
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService) {
  }
  /**
   * logout
   */
  logout() {
    this.authService.logout();
  }
}
