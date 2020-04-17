import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  message: string;

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
  }

  send(){
    this.chat.sendMessage(this.message);
    this.message = '';
  }
  //If you press enter after typing and not 'Send' button it should also work..
  handleSubmit(event){
    //13 is for enter key..
    if(event.keyCode === 13) {
      this.send();
    }
  }

}
