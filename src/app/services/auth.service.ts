import { Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Practitioner } from '../interfaces/practitioner.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  user: User;
  loggedUser: Practitioner;
  lgUserName = '';

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private firestore: AngularFirestore,
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  canChangePermissions(): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(this.loggedUser, allowed);
  }

  canReadFills(): boolean {
    const allowed = ['admin', 'specialist'];
    return this.checkAuthorization(this.loggedUser, allowed);
  }

  canAddHistoDiagnosis(): boolean {
    const allowed = ['administrator', 'specialist', 'admin'];
    return this.checkAuthorization(this.loggedUser, allowed);
  }

  canAddClinicalDiagnosis(): boolean {
    const allowed = ['specialst', 'admin'];
    return this.checkAuthorization(this.loggedUser, allowed);
  }

  canSeePersonalData(): boolean {
    const allowed = ['specialst', 'admin', 'administrator'];
    return this.checkAuthorization(this.loggedUser, allowed);
  }

  canReadAll(): boolean {
    const allowed = ['specialist', 'admin'];
    return this.checkAuthorization(this.loggedUser, allowed);
  }

  onlyRead() {
    const allowed = ['basic', 'specialist', 'admin', 'administrator'];
    return this.checkAuthorization(this.loggedUser, allowed);
  }

  canAddFill() {
    const allowed = ['basic', 'administrator', 'admin'];
    return this.checkAuthorization(this.loggedUser, allowed);
  }

  checkAuthorization(user: Practitioner, allowedRoles: string[]): boolean {
    if (!user) { return false; }
    let q = 0;
    for (const role of allowedRoles) {
      user.roles.forEach(element => {
        if (element === role) {
          q++;
        }
      });
    }
    if (q === 0) {
      return false;
    } else {
      return true;
    }
  }

  get authenticated(): boolean {
    // tslint:disable-next-line: variable-name
    let boolean = false;
    if (this.user !== undefined) {
      boolean = true;
    }
    return boolean;
  }

  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  async getUser() {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          const prRef = this.firestore.collection('Practitioner').ref;
          prRef.where('email', '==', user.email).get().then(data => {
            const docSnapshots = data.docs;
            docSnapshots.forEach(element => {
              this.loggedUser = element.data() as Practitioner;
              this.loggedUser.practitonerID = element.id;
              localStorage.setItem('loggedIn', JSON.stringify(this.loggedUser));
              // tslint:disable-next-line: max-line-length
              this.lgUserName = this.loggedUser.prefix + ' ' + this.loggedUser.family + ' ' + this.loggedUser.given + ' ' + this.loggedUser.suffix;
              resolve();
            });
          });
        }
      });
    });
  }

  async login(email: string, password: string) {
    try {
      const err = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      await this.getUser();
      this.router.navigateByUrl('/wall');
    } catch (e) {
      return e.message;
    }
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  getLoggedUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }


}
