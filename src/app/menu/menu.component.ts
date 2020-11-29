import { Component, OnInit, Input } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input()
  user: User;
  constructor(private afAuth: AngularFireAuth) { }

  logout() {
   this.afAuth.auth.signOut();
  }

  ngOnInit(): void {
  }

}
