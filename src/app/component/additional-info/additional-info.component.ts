import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css']
})
export class AdditionalInfoComponent implements OnInit {
  privateKey = '';
  publicKey = '';
  constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    private router: Router,
    private auth: AngularFireAuth
  ) {
  }

  ngOnInit() {}
  submit() {
    this.db
      .collection('users')
      .doc(this.auth.auth.currentUser.uid)
      .set({ privateKey: this.privateKey, publicKey: this.publicKey })
      .then(() => {
        this.router.navigate(['wallet']);
      });
  }
}
