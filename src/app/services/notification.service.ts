import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Noti } from '../interfaces/noti.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private firestore: AngularFirestore, private auth: AuthService) { }
  notifications = [];

  getNoti() {
    return new Promise((resolve, reject) => {
      this.notifications = [];
      let docSnapshots = [];
      let i = 0;
      this.firestore.collection('Notification').ref.where('workgroupID', '==', this.auth.loggedUser.workgroup).get().then(data => {
        docSnapshots = data.docs;
        docSnapshots.forEach(element => {
          this.notifications.push(element.data() as Noti);
          this.notifications[i].id = element.id;
          i++;
        });
        resolve();
      });
    });
  }

  addNotification(notification: Noti, id: string) {
    this.firestore.collection('Notification').doc(id).set(notification);
  }

}
