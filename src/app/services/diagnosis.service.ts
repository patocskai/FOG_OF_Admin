import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Diagnosis {
  category: string;
  code: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})

export class DiagnosisService {

  private diagnosisCollection: AngularFirestoreCollection<Diagnosis>;
  public diagList = [];

  constructor(private firestore: AngularFirestore) {
    this.diagnosisCollection = this.firestore.collection<Diagnosis>('Diagnosis');
    this.getAllDiagnosis();
  }

  getAllDiagnosis() {
    this.diagnosisCollection.valueChanges().subscribe((data) => {
      this.diagList = [];
      data.forEach((diag) => {
        this.diagList.push(diag.text);
      });
    });
  }

  addDiagnosis(diag: string, category: string, code: string): Promise<firebase.firestore.DocumentReference> {
    return this.diagnosisCollection.add({ category, code, text: diag });
  }

}
