import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss']
})
export class AdditionalInfoComponent implements OnInit {
  // TODO load privatekey and public key from database
  // disable submit when empty
  // explication sur que faut il mettre
  // ajout bouton interface pour changer ses clés

  constructor(
    private authService: AuthService,
    private router: Router,
    private auth: AngularFireAuth,
    private dbFb: AngularFireDatabase
  ) {}

  ngOnInit() {}
  submit(form: NgForm) {
    this.dbFb.database
      .ref('users/' + this.auth.auth.currentUser.uid + '/key')
      .push({
        privateKey: form.value.privateKey,
        publicKey: form.value.publicKey
      });
  }
}
