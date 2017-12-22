import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { Component } from '@angular/core';
/**
 * TODO on this screen :
 * ** make graph look like stream but stop on rangechanged and start again when user go to end of data
 * (ou juste un bouton pour revenir a l'état stream)
 * http://visjs.org/examples/graph2d/15_streaming_data.html
 * ** on event rangechanged load more data in past
 *
 * TODO General :
 * ** mettre tout les commentaires en Anglais
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Sets initial value to true to show loading spinner on first load
  loading = true;

  constructor(private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }
  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }
    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }
}
