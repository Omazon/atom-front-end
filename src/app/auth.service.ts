import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user$ = afAuth.authState.pipe(
      map(user => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          return user;
        } else {
          localStorage.removeItem('user');
          return null;
        }
      })
    );
  }

  async signIn(email: string, password: string) {
    const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    if(user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  async createUser(email: string, password: string) {
    const userCredential= await this.afAuth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    if(user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  async signOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem('user')!);
  }
}
