import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menuCurrency: string[] = [];

  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private authService: AuthService) {
    // TODO charger ce composant seulement quand l'utilisateur est authentifier
    this.auth.authState.subscribe(test => {
      let t = this.db
        .collection('users')
        .doc(this.auth.auth.currentUser.uid)
        .collection('currency');
      t.ref.get().then(changes => {
        changes.forEach(c => {
          this.menuCurrency.push(c.id);
        });
      });
    });
  }
  logout() {
    this.authService.logout();
  }
}
