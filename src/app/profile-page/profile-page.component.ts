import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo/services/todo.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {TodoViewModel} from '../todo/models/todo-view-model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(private todoService: TodoService,
              private modalService: NgbModal,
              private afAuth: AngularFireAuth) { }

  user: User;
  userData = [];

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      if (user) {
        console.log(user.uid);
        console.log(user.email);
        console.log(Object.keys(user));
      }
    });
  }
}
