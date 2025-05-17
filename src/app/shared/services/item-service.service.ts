import { Injectable } from '@angular/core';
import {
  collection,
  collectionData, deleteDoc,
  doc,
  DocumentSnapshot,
  Firestore,
  getDoc, getDocs,
  orderBy,
  query, updateDoc
} from '@angular/fire/firestore';
import {Product_item} from '../model/product_item';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CollectionReference, DocumentData, DocumentReference} from '@angular/fire/compat/firestore';
import {addDoc, FirestoreDataConverter, setDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private firestore : Firestore){
  }


  async getItems(): Promise<Product_item[]> {
    const itemsCollection = collection(this.firestore, 'Items');
    const q = query(
      itemsCollection,
      orderBy('quantity', 'desc'),
      orderBy('price', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const items: Product_item[] = [];
    querySnapshot.forEach((doc) => {
      items.push({id: doc.id, ...doc.data()} as Product_item);
    });
    return items;
  }

  async getItem(id: string): Promise<Product_item | null> {
    const itemDocRef = doc(this.firestore, 'Items', id);
    const snapshot: DocumentSnapshot = await getDoc(itemDocRef); // Await for the promise

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Product_item;
    } else {
      return null;
    }
  }

  saveProduct(item:Product_item): Observable<string> {
    const itemsCollection = collection(this.firestore, 'Items');
    return from(addDoc(itemsCollection, this.convert(item))).pipe(
      map(docRef => docRef.id)
    );
  }

  updateProduct(item: Product_item): Observable<void> {
    const itemDocRef = doc(this.firestore, 'Items', item.id);
    return from(updateDoc(itemDocRef, this.convert(item) as any));
  }

  deleteProduct(id: string): Observable<void> {
    const itemDocRef = doc(this.firestore, 'Items', id);
    return from(deleteDoc(itemDocRef));
  }

  convert(item: Product_item){
    return {name:item.name,price:item.price,image:item.image,description:item.description,quantity:item.quantity}
  }



}
