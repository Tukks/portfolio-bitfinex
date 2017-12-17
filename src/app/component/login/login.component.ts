import { Component } from '@angular/core';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private zone: NgZone
  ) {}

  signInWithGoogle() {
    this.authService
      .signInWithGoogle()
      .then(res => {
        // Quick fix https://stackoverflow.com/questions/45204998/angular-cli-lifecycle-hooks-not-being-called-on-navigation
        this.zone.run(() => {
          if (res.additionalUserInfo.isNewUser) {
            this.router.navigate(['/additional_info']);
          } else {
            this.router.navigate(['/graph/overview']);
          }
        });
      })
      .catch(err => console.log(err));
  }
}
