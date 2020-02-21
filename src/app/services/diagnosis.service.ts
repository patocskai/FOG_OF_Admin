import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Diagnosis {
  text: string;
  ordinal: number;
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
      data.sort((a, b) => {
        if (a.ordinal == b.ordinal) return 0;
        if (a.ordinal > b.ordinal) return 1;
        if (b.ordinal > a.ordinal) return -1;
      });
      data.forEach((diag) => {
        this.diagList.push(diag.text);
      });
    });
  }

  addDiagnosis(diag: string, ordinal: number): Promise<firebase.firestore.DocumentReference> {
    return this.diagnosisCollection.add({ text: diag, ordinal: ordinal });
  }

}
