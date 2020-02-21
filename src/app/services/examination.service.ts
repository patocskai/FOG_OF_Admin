import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Examination } from 'src/app/interfaces/examination.interface';
import { AuthService } from './auth.service';
import { FillService } from './fill.service';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {
  examinations: Examination[] = [];

  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService,
    private fillService: FillService,
    private storage: AngularFireStorage
  ) { }

  getExaminations() {
    return this.firestore.collection('Examination').ref.where('workgroup', '==', this.auth.loggedUser.workgroup);
  }

  getAllExaminations() {
    return this.firestore.collection('Examination').ref;
  }

  getExaminationsByID(id: string) {
    return this.firestore.collection('Examination').doc(id).valueChanges();
  }

  deleteIMG(path: string): Promise<any> {
    var storageRef = this.storage.storage.ref();
    var imgRef = storageRef.child(path);
    return imgRef.delete();
  }

  deleteExam(id: string) {
    return this.firestore.collection('Examination').doc(id).delete();
  }

  async updateExaminationDiagnose(examinationID: string, diagnose: string, clinicalDiagnose: string) {
    this.fillService.openFills(examinationID);
    return new Promise((resolve, reject) => {
      const myRef = this.firestore.collection('Examination').ref;
      if (diagnose !== '') {
        myRef.doc(examinationID).update('diagnostics', diagnose);
        myRef.doc(examinationID).update('opened', 'none');
      }
      if (clinicalDiagnose !== '') {
        myRef.doc(examinationID).update('clinicalDiagnose', clinicalDiagnose);
      }
    });
  }
}
