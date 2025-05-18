import { Injectable } from '@angular/core';
import {Auth} from '@angular/fire/auth';
import {addDoc, collection, DocumentSnapshot, Firestore, getDocs, orderBy, query, where} from '@angular/fire/firestore';
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

  async getOrdersByUserIdOrderByPrice(userId: string): Promise<Order[]> {
    const ordersCollection = collection(this.firestore, 'Carts');
    const q = query(ordersCollection, where('user', '==', userId), orderBy("total","desc"));

    try {
      const querySnapshot = await getDocs(q);
      const orders: Order[] = [];
      querySnapshot.forEach((doc: DocumentSnapshot) => {
        if (doc.exists()) {
          const orderData = doc.data() as Order;
          orders.push(orderData);
        }
      });
      return orders;
    } catch (error) {
      console.error('Hiba a rendelések lekérdezése során:', error);
      throw error;
    }
  }

  async getOrdersByUserIdOrderByDate(userId: string): Promise<Order[]> {
    const ordersCollection = collection(this.firestore, 'Carts');
    const q = query(ordersCollection, where('user', '==', userId), orderBy("date","desc"));

    try {
      const querySnapshot = await getDocs(q);
      const orders: Order[] = [];
      querySnapshot.forEach((doc: DocumentSnapshot) => {
        if (doc.exists()) {
          const orderData = doc.data() as Order;
          orders.push(orderData);
        }
      });
      return orders;
    } catch (error) {
      console.error('Hiba a rendelések lekérdezése során:', error);
      throw error;
    }
  }
}
