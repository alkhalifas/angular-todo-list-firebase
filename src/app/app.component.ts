import { Component, OnInit, NgZone } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  user: User;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private ngZone: NgZone){
    afAuth.authState.subscribe(auth => {
      if(auth) {
        console.log('logged in');
      } else {
        console.log('not logged in');
      }
    });
  }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user != null) {
        // User is logged in, use the user object for its info.
        this.user = user;
        // etc.
      } else {
        // User is not logged in, redirect to where you need to.
        this.user = null;
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
      }
    });
    /* this.afAuth.user.onAuthStateChanged( user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
        this.ngZone.run(() => {
          this.router.navigate(['']);
        })
      }
    }); */
  }

}
