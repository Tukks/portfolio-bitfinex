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
    public auth: AngularFireAuth,
    private authService: AuthService,
    private dbFb: AngularFireDatabase
  ) {
    this.auth.authState.filter(state => state !== null).subscribe(user => {
      this.dbFb
        .list('users/' + user.uid + '/menu')
        .snapshotChanges()
        .subscribe(menuItems => {
          this.menuCurrency = [];
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
