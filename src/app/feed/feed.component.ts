import { Component, OnInit, OnChanges } from '@angular/core';
//Need to show chats in Feed
import { ChatService } from '../services/chat.service'
import { Observable } from 'rxjs/Observable';
import { ChatMessage } from '../models/chat-message.model'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: Observable<ChatMessage[]>; //Not AngularFireList Or FireListDatabase, It's simpler now..

  constructor(private chat: ChatService) { }
  //On page start
  ngOnInit(): void {
    this.feed = this.chat.getMessages();
  }

  //New message or reload
  ngOnChanges(): void {
    this.feed = this.chat.getMessages();
  }

}
