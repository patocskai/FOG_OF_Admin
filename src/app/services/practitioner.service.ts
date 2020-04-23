import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Practitioner } from '../interfaces/practitioner.interface';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PractitionerService {
  practitioners: Practitioner[] = []; // régi

  private practitionerCollection: AngularFirestoreCollection<Practitioner>; // új
  private prac: Observable<Practitioner[]>; // új
  
  constructor(private firestore: AngularFirestore, private auth: AuthService) {
    this.practitionerCollection = firestore.collection<Practitioner>('Practitioner');  // új

    this.prac = this.practitionerCollection.snapshotChanges().pipe(
      map((action) => {
        return action.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getAllPrac() { // új
    return this.prac;
  }

  getPrac(id) { // új
    return this.practitionerCollection.doc<Practitioner>(id).valueChanges();
  }



  getPractitioners(id: any) {
    // régi
    return this.firestore.collection('Practitioner').doc(id).valueChanges();
  }

  getAllPractitioner() {
    // régi
    return this.firestore.collection('Practitioner').ref;
  }

  changePractitionersPermissions(practitionerWithPermissions: any[]) {
    const myRef = this.firestore.collection('Practitioner').ref;
    practitionerWithPermissions.forEach((element) => {
      const roles = [];
      if (element.roles[0].basic === true) {
        roles.push('basic');
      }
      if (element.roles[1].admin === true) {
        roles.push('admin');
      }
      if (element.roles[2].administrator === true) {
        roles.push('administrator');
      }
      if (element.roles[3].specialist === true) {
        roles.push('specialist');
      }
      myRef.doc(element.id).update('roles', roles);
    });
  }

  // updateDermatoscopeExperience(value: string, id: string) {
  //   this.firestore
  //     .collection('Practitioner')
  //     .ref.doc(id)
  //     .update('dermatoscopeExperience', value);
  // }

  removePractitionerFromWorkgroup(id: string) {
    const myRef = this.firestore.collection('Practitioner').ref;
    myRef.doc(id).update('roles', []);
    myRef.doc(id).update('workgroup', '');
  }

  addPractitionerForWorkgroup(id: string) {
    const myRef = this.firestore.collection('Practitioner').ref;
    myRef.doc(id).update('roles', ['basic']);
    myRef.doc(id).update('workgroup', this.auth.loggedUser.workgroup);
  }

  getStaff() {
    return this.firestore
      .collection('Practitioner')
      .ref.where('workgroup', '==', this.auth.loggedUser.workgroup);
  }

  getAvailableUsers() {
    return this.firestore
      .collection('Practitioner')
      .ref.where('workgroup', '==', '')
      .get();
  }
  async getAllPractitioners() {
    let docSnapshots = [];
    this.practitioners = [];
    let i = 0;
    await this.firestore
      .collection('Practitioner')
      .ref.where('workgroup', '==', this.auth.loggedUser.workgroup)
      .get()
      .then((data) => {
        docSnapshots = data.docs;
        docSnapshots.forEach((element) => {
          this.practitioners.push(element.data());
          this.practitioners[i].practitonerID = element.id;
          i++;
        });
      });
    return this.practitioners;
  }
}
