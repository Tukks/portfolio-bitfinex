import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  menuCurrency: string[] = [];

  constructor(
    private auth: AngularFireAuth,
    private authService: AuthService,
    private dbFb: AngularFireDatabase
  ) {
    // TODO charger ce composant seulement quand l'utilisateur est authentifier
    this.auth.authState.subscribe(() => {
      this.dbFb
        .list('users/' + this.auth.auth.currentUser.uid + '/menu')
        .snapshotChanges()
        .take(1)
        .subscribe(menuItems => {
          menuItems.forEach(item => {
            // TODO Change That!!!!
            if (item.key !== 'overview') {
              this.menuCurrency.push(item.key);
            }
          });
        });
    });
  }
  logout() {
    this.authService.logout();
  }
}
