import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Workgroup } from '../interfaces/workgroup.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkgroupService {
  workgroups: Workgroup[] = [];

  private workGroupsCollection: AngularFirestoreCollection<Workgroup>;
  private workGroups: Observable<Workgroup[]>;

  constructor(private firestore: AngularFirestore) {
    this.workGroupsCollection = firestore.collection<Workgroup>('Workgroup');

    this.workGroups = this.workGroupsCollection.snapshotChanges().pipe(
      map(action => {
        return action.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }

  getAllWorkGroups(){
    return this.workGroups;
  }

  getWorkGroup(id){
    return this.workGroupsCollection.doc<Workgroup>(id).valueChanges();
  }

  updateWorkGroup(workGroup: Workgroup, id: string){
    return this.workGroupsCollection.doc(id).update(workGroup);
  }

  addWorkGroup(workGroup: Workgroup){
    return this.workGroupsCollection.add(workGroup);
  }

  removeWorkGroup(id) {
    return this.workGroupsCollection.doc(id).delete();
  }



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
