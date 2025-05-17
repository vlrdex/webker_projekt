import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User as FirebaseUser
} from '@angular/fire/auth';
import {Firestore, doc, getDoc, DocumentSnapshot, setDoc} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, from, switchMap, of } from 'rxjs';
import {User} from '../model/User';
import {DocumentData, DocumentReference} from '@angular/fire/compat/firestore';
import {map, take} from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: Observable<FirebaseUser | null>;

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {
    this.currentUser = authState(this.auth);
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const firebaseUser = userCredential.user;

      if (firebaseUser) {
        const userDocRef = doc(this.firestore, 'Users', firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data() as User;
          localStorage.setItem('user', JSON.stringify(userData));
          console.log('Felhasználó adatok tárolva a localStorage-ban:', userData);
          this.router.navigate(['/home']);
        } else {
          console.warn('A felhasználói dokumentum nem található a Firestore-ban:', firebaseUser.uid);
        }
      }
    } catch (error: any) {
      console.error('Bejelentkezési hiba:', error.message);
      throw error;
    }
  }

  async register(user: User,password:string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, user.email, password);
      const firebaseUser = userCredential.user;

      if (firebaseUser) {

        // Lementjük a felhasználói adatokat a Firestore Users kollekciójába a UID alapján
        const userDocRef = doc(this.firestore, 'Users', firebaseUser.uid);
        await setDoc(userDocRef, user);
        this.router.navigate(['/login']);
      }
    } catch (error: any) {
      console.error('Regisztrációs hiba:', error.message);
      throw error; // Dobd tovább a hibát, hogy a komponens is kezelhesse
    }
  }

  signOut(): Promise<void> {
    localStorage.removeItem('user'); // Távolítsuk el a felhasználói adatokat a localStorage-ból
    return this.auth.signOut().then(() => {
      this.router.navigate(['/login']); // Például a bejelentkezési oldalra irányítunk
    });
  }

  public getUserFromLocalStorage(): User {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser) as User;
      } catch (error) {
        console.error('Hiba a felhasználói adatok feldolgozása során a localStorage-ból:', error);
        localStorage.removeItem('user'); // Ha hiba van, töröljük a hibás adatot
        return {name:"ismeretlen",email:"ismeretlen",admin:false};
      }
    }
    return {name:"ismeretlen",email:"ismeretlen",admin:false};
  }

  isLogedIn():boolean{
    return !(this.getUserFromLocalStorage().name==="ismeretlen");
  }

  userId() :string{
    return this.auth.currentUser?.uid ? this.auth.currentUser.uid :""
  }

  isAdmin():boolean{
    return this.getUserFromLocalStorage().admin;
  }


}
