import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Fill } from '../interfaces/fill.interface';
import { PassDataService } from './pass-data.service';

@Injectable({
  providedIn: 'root'
})
export class FillService {

  fills: Fill[] = [];
  filteredFills: Fill[] = [];
  constructor(private auth: AuthService, private firestore: AngularFirestore, private dataService: PassDataService) { }

  updateFill(fillID: string, diagnose: string) {
    const myRef = this.firestore.collection('Fill').ref;
    myRef.doc(fillID).update('diagnose', diagnose);
    myRef.doc(fillID).update('opened', 'yes');
  }

  updateFillOpened(FillID: string, opened: string) {
    const myRef = this.firestore.collection('Fill').ref;
    myRef.doc(FillID).update('opened', opened);
  }

  getFills() {
    return this.firestore.collection('Fill').ref.where('workGroup', '==', this.auth.loggedUser.workgroup);
  }

  getUserFills() {
    return this.firestore.collection('Fill').ref.where('practitionerID', '==', this.auth.loggedUser.practitonerID).get();
  }

  getUserFillForExamination(examinationID: string) {
    return this.firestore.collection('Fill').ref.where('examinationID', '==', examinationID).where('practitionerID', '==', this.auth.loggedUser.practitonerID).get();
  }

  getAllFills() {
    return this.firestore.collection('Fill').ref;
  }

  getFills2() {
    return this.firestore.collection('Fill').ref.where('workGroup', '==', this.auth.loggedUser.workgroup).get();
  }

  deleteFillsByExamID(examinationID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firestore.collection('Fill').ref.where('examinationID', '==', examinationID).get().then((snapshot) => {
        const size = snapshot.size;
        var deleted = 0;
        if (size == 0) { resolve(0); }
        snapshot.forEach((document) => {
          document.ref.delete().then(() => {
            deleted++;
            if (deleted == size) {
              resolve(deleted);
            }
          }).catch((error) => {
            reject(error);
          });
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }

  async openFills(examinationID: string) {
    let docSnapshots = [];
    return new Promise((resolve, reject) => {
      const myRef = this.firestore.collection('Fill').ref;
      myRef.where('examinationID', '==', examinationID).get().then(data => {
        docSnapshots = data.docs;
        docSnapshots.forEach(element => {
          myRef.doc(element.id).update('opened', 'none');
        });
      });
      resolve()
    });
  }
}
