import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Workgroup } from '../interfaces/workgroup.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkgroupService {

  workgroups: Workgroup[] = [];
  constructor(private firestore: AngularFirestore) { }

  getWorkgroups() {
    return new Promise((resolve, reject) => {
      this.firestore.collection('Workgroup').snapshotChanges().subscribe(data => {
        this.workgroups = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Workgroup;
        });
        resolve()
      });
    });
  }
}
