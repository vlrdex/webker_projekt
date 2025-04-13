import { Component } from '@angular/core';
import {Product_item} from '../../shared/model/product_item';
import {RouterLink} from '@angular/router';
import {NumberShortPipe} from '../../shared/pipes/number-short.pipe';
import {CartItemComponent} from './cart-item/cart-item.component';
import {CartItem} from '../../shared/model/cart';
import {User} from '../../shared/model/User'
import {Order} from '../../shared/model/order';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-cart',
  imports: [
    RouterLink,
    NumberShortPipe,
    CartItemComponent,
    MatButton,
  ],
  templateUrl: './cart.component.html',
  standalone: true,
  styleUrl: './cart.component.scss'
})
export class CartComponent{
  cartItems=[
    {
      name: "Szönyeg",
      description: "Kék ha nem látnád de amugy nagyon szép",
      price: 49.99,
      image: "https://dodo.hu/cdn/shop/products/modern-art-tuerkiz-szoevet-szonyeg-240cm-dodo-designban-otthon-989.jpg?v=1743513547",
      quantity : 1
    },
    {
      name: "Szönyeg2",
      description: "Kék ha nem látnád de amugy nagyon szép",
      price: 49.99,
      image: "https://dodo.hu/cdn/shop/products/modern-art-tuerkiz-szoevet-szonyeg-240cm-dodo-designban-otthon-989.jpg?v=1743513547",
      quantity : 1
    },
    {
      name: "Szönyeg3",
      description: "Kék ha nem látnád de amugy nagyon szép",
      price: 49.99,
      image: "https://dodo.hu/cdn/shop/products/modern-art-tuerkiz-szoevet-szonyeg-240cm-dodo-designban-otthon-989.jpg?v=1743513547",
      quantity : 1
    },
    {
      name: "Szönyeg4",
      description: "Kék ha nem látnád de amugy nagyon szép",
      price: 49.99,
      image: "https://dodo.hu/cdn/shop/products/modern-art-tuerkiz-szoevet-szonyeg-240cm-dodo-designban-otthon-989.jpg?v=1743513547",
      quantity : 0
    },
  ];
  totalPrice:number;

  constructor() {
    this.totalPrice=0;
    this.updateTotalPrice();
  }






  changeQuantity(item: Product_item, quantity: number): void {
    const itemToUpdate = this.cartItems.find(i => i.name === item.name);

    if (itemToUpdate) {
      itemToUpdate.quantity = Math.max(1, quantity); // Biztosítjuk, hogy a mennyiség legalább 1 legyen
      this.updateTotalPrice();
    }
  }

  removeItem(item:Product_item){
    this.cartItems=this.cartItems.filter(i => i.name!=item.name);
    this.updateTotalPrice()
  }

  private updateTotalPrice(): void {
    let sum:number=0;
    for (let item of this.cartItems){
      sum+=item.price*item.quantity;
    }

    this.totalPrice=sum;
  }


  changeTo(item:Product_item):CartItem{
    return {
      product:item,
      hosszu:false
    }
  }

  teszt:Order={
    user:{
      email:"kuki",
      password:"nincs",
      name:"teszt",
    },
    products:this.cartItems
  }

  orderCart(){
    console.log(this.teszt);
  }



}
