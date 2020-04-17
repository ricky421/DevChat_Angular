import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent {

  constructor( ) { }
  /*
  Tried but server fails to load when restarted again.. :(
  
  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if(!user){
        this.router.navigate(['login']);
      }
    });
  }
  ngOnChanges(): void {
    this.afAuth.authState.subscribe(user => {
      if(!user){
        this.router.navigate(['login']);
      }
    });
  }
  */
}
