import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  errorMessage = '';
  showError = false;
  userForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private authService: AuthService) { }

  login() {
    if (this.userForm.value.email !== null && this.userForm.value.password !== null) {
      this.authService.login(this.userForm.value.email, this.userForm.value.password).then(data => {
        // tslint:disable-next-line: triple-equals
        if (data != undefined) {
          this.errorMessage = data;
          this.showError = true;
        } else {
          this.showError = false;
        }
      });
    } else {
      this.errorMessage = 'Felhasználó és/vagy jelsző mező üres. Kérem töltse ki!';
      this.showError = true;
    }
  }
  ngOnInit() {
  }

}
