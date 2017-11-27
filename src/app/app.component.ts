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
/**
 * TODO on this screen :
 * ** make graph look like stream but stop on rangechanged and start again when user go to end of data
 * (ou juste un bouton pour revenir a l'état stream)
 * http://visjs.org/examples/graph2d/15_streaming_data.html
 * ** on event rangechanged load more data in past
 * ** le sortir dans un composant
 * ** ne pas charger toutes les données d'un coup, on va limiter a 1 semaines
 *
 * TODO General :
 * ** add overview wallet, need change on working.js
 * ** add graph par monnaie, need change working.js
 * ** authentification firebase, actuellement le read est en public /!\
 * ** multi user? permet a l'utilisateur de charger sa clé bitfinex dans l'interface, firebase le
 * gére, on pourrait le rattacher a son profil lors de l'inscription
 * nodeJs: forEach user sur firebase, get key bitfinex, faire les requetes pour chaque user
 * ** changer pour CloudFirestore??
 * **
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
  }

}
