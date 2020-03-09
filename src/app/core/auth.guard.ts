import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private loggedIn = false;

  constructor(
    private router: Router,
    private af: AngularFireAuth,
    private auth: AuthService
  ) {
    af.authState.subscribe(res => this.onAuthChange(res));
  }

  private onAuthChange(auth) {
    this.loggedIn = auth ? true : false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (localStorage.getItem('user') !== null) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;

  }
}