import { Injectable } from '@angular/core';
import {Auth} from '@angular/fire/auth';
import {addDoc, collection, Firestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {Order} from '../model/order';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private firestore:Firestore) {}


  saveOrder(order: Order): Observable<string> {
    const cartsCollection = collection(this.firestore, 'Carts');
    return from(addDoc(cartsCollection, order)).pipe(
      map(ref => ref.id)
    );
  }
}
