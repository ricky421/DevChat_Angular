import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userName: string;
  messageContent: string;
  timeSent: string;
  email: string;

  constructor() { }

ngOnInit(chatMessage = this.chatMessage){
    this.messageContent = chatMessage.message;
    this.userName = chatMessage.userName;
    this.timeSent = chatMessage.timeSent;
    this.email = chatMessage.email;
  }

}
