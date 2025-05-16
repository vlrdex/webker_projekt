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

@Component({
  selector: 'app-cart',
  imports: [
    RouterLink,
    NumberShortPipe,
    CartItemComponent,
    MatButton,
    MatCard,
  ],
  templateUrl: './cart.component.html',
  standalone: true,
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnDestroy{
  cartItems:CartItem[]=[];
  totalPrice:number;

  constructor() {
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


  changeTo(item:Product_item):CartItem{
    return {
      product:item,
      hosszu:false
    }
  }


  orderCart(){
    console.log(this.cartItems);
    localStorage.removeItem("cart")
  }



}
