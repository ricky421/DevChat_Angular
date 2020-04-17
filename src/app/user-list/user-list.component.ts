import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges {
  users: Observable<User[]>;

  constructor(private auth: AuthService) { }

  ngOnInit():void{
    this.users = this.auth.getUsersOnline();
  }

  ngOnChanges():void{
    this.users = this.auth.getUsersOnline();
  }

}
