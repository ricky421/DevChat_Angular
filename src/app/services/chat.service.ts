import { Injectable } from '@angular/core';
//FirebaseListObservable changed to AngularFireList
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { User } from '../models/user.model';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: User;
  chatMessages: Observable<ChatMessage[]>;
  chatMessage: ChatMessage;
  userName: string;

  constructor(
    //Injectables..
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    
    this.chatMessages = this.getMessages();
  }



  sendMessage(msg: string) {
    const time = this.getTimeStamp();
    //nested hell works
    this.afAuth.authState.subscribe(user => {
      this.db.object('users/'+user.uid).valueChanges().subscribe((obj) => {

        if(user) {
          this.db.list('messages').push({
          message: msg,
          timeSent: time,
          userName:  obj.displayName,
          email: user.email //or obj.email also works!
        });
        }

      });
    });
    //const user_email = this.user.email;
    //this.user.displayName not working, sync time problems, best to nest subscribes like above..

    this.chatMessages = this.getMessages();
    console.log("Called sendMessage.");
  }

  getMessages() {
    // message feed fetching
    return this.db.list('messages', ref => {
      return ref.limitToLast(25).orderByKey()
    }).valueChanges();
  }

  getTimeStamp(){
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();
    return (date + ' ' + time);
  }
}
