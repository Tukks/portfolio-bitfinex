import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import {NgForm} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css']
})
export class AdditionalInfoComponent implements OnInit {
  // TODO load privatekey and public key from database
  // disable submit when empty
  // explication sur que faut il mettre
  // ajout bouton interface pour changer ses clés

  constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    private router: Router,
    private auth: AngularFireAuth
  ) {
  }

  ngOnInit() {}
  submit(form: NgForm) {
    this.db
      .collection('users')
      .doc(this.auth.auth.currentUser.uid)
      .set({ privateKey: form.value.privateKey, publicKey: form.value.publicKey })
      .then(() => {
        this.router.navigate(['wallet']);
      });
  }
}
