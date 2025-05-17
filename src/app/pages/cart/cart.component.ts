import { Component,OnDestroy } from '@angular/core';
import {Product_item} from '../../shared/model/product_item';
import {RouterLink} from '@angular/router';
import {NumberShortPipe} from '../../shared/pipes/number-short.pipe';
import {CartItemComponent} from './cart-item/cart-item.component';
import {CartItem} from '../../shared/model/cart';
import {User} from '../../shared/model/User'
import {Order} from '../../shared/model/order';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {UserService} from '../../shared/services/user.service';
import {async, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AsyncPipe, NgStyle} from '@angular/common';
import {Timestamp} from '@angular/fire/firestore';
import {CartService} from '../../shared/services/cart-service.service';

@Component({
  selector: 'app-cart',
  imports: [
    RouterLink,
    NumberShortPipe,
    CartItemComponent,
    MatButton,
    MatCard,
    NgStyle,
    AsyncPipe,
  ],
  templateUrl: './cart.component.html',
  standalone: true,
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnDestroy{
  cartItems:CartItem[]=[];
  totalPrice:number;

  constructor(protected userService: UserService,private cartservice: CartService) {
    this.totalPrice=0;
    this.updateTotalPrice();
    var a=localStorage.getItem("cart");
    if(a){
      try {
        this.cartItems = JSON.parse(a) as CartItem[];
      }catch (e){
        this.cartItems=[]
      }
    }
  }

  ngOnDestroy() {
    localStorage.setItem("cart",JSON.stringify(this.cartItems))
  }



  changeQuantity(item: Product_item, quantity: number): void {
    const itemToUpdate = this.cartItems.find(i => i.product.id === item.id);

    if (itemToUpdate) {
      itemToUpdate.product.quantity = Math.max(1, quantity); // Biztosítjuk, hogy a mennyiség legalább 1 legyen
      this.updateTotalPrice();
    }
  }

  removeItem(item:Product_item){
    this.cartItems=this.cartItems.filter(i => i.product.id!=item.id);
    this.updateTotalPrice()
  }

  private updateTotalPrice(): void {
    let sum:number=0;
    for (let item of this.cartItems){
      sum+=item.product.price*item.product.quantity;
    }

    this.totalPrice=sum;
  }



  orderCart(){
    if(this.userService.isLogedIn()){
      var order : Order = {
        user:this.userService.userId(),
        products:this.cartItems.map(e => e.product),
        date:Timestamp.now(),
        total:this.totalPrice
      }
      this.cartservice.saveOrder(order)
      localStorage.removeItem("cart")
      this.cartItems=[];
    }
  }

  clearCart(){
    localStorage.removeItem("cart")
    this.cartItems=[];
  }



}
