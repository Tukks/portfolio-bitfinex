import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = null;

  constructor(private authService: AuthService, private router: Router) {}

  signInWithGoogle() {
    this.authService
      .signInWithGoogle()
      .then(res => {
        this.router.navigate(['wallet']);
      })
      .catch(err => console.log(err));
  }

  ngOnInit() {}
}
