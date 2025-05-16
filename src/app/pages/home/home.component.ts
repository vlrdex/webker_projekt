import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {Product_item} from '../../shared/model/product_item'
import {
  MatCard,
  MatCardActions,
  MatCardContent, MatCardFooter, MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {ItemCardComponent} from './item-card/item-card.component';
import {CartItem} from '../../shared/model/cart';


@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatCardTitle,
    MatCardTitle,
    MatCardContent,
    MatCard,
    MatCardImage,
    MatCardSubtitle,
    MatCardActions,
    MatCardHeader,
    MatCardFooter,
    ItemCardComponent,
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // products: Product_item[] = [
  //   {
  //     name: "Szönyeg",
  //     description: "Kék ha nem látnád de amugy nagyon szép",
  //     price: 49.99,
  //     image: "https://dodo.hu/cdn/shop/products/modern-art-tuerkiz-szoevet-szonyeg-240cm-dodo-designban-otthon-989.jpg?v=1743513547",
  //     quantity : 1
  //   },
  //   {
  //     name: "Szönyeg",
  //     description: "Kék ha nem látnád de amugy nagyon szép",
  //     price: 49.99,
  //     image: "https://dodo.hu/cdn/shop/products/modern-art-tuerkiz-szoevet-szonyeg-240cm-dodo-designban-otthon-989.jpg?v=1743513547",
  //     quantity : 1
  //   },
  //   {
  //     name: "Szönyeg",
  //     description: "Kék ha nem látnád de amugy nagyon szép",
  //     price: 49.99,
  //     image: "https://dodo.hu/cdn/shop/products/modern-art-tuerkiz-szoevet-szonyeg-240cm-dodo-designban-otthon-989.jpg?v=1743513547",
  //     quantity : 1
  //   },
  //   {
  //     name: "Szönyeg",
  //     description: "Kék ha nem látnád de amugy nagyon szép",
  //     price: 49.99,
  //     image: "https://dodo.hu/cdn/shop/products/modern-art-tuerkiz-szoevet-szonyeg-240cm-dodo-designban-otthon-989.jpg?v=1743513547",
  //     quantity : 0
  //   },
  // ];

  products=[]

  onAddToCart(product: Product_item): void {
    console.log('Termék hozzáadva a kosárhoz:', product);
    let cart: CartItem[] = [];
    const storedCart = localStorage.getItem("cart");
    if(storedCart){
      try {
        const parsedCart = JSON.parse(storedCart) as CartItem[];
        cart = parsedCart;
      } catch (error) {
        console.error("Hiba a kosár adatainak feldolgozása során:", error);
        cart = [];
      }
    }
    var talalt=false;
    cart.forEach(e => {if(e.product.id==product.id){e.product.quantity++; talalt=true}})
    if(!talalt){
      cart.push({hosszu:false,product:product})
    }
    localStorage.setItem("cart",JSON.stringify(cart))
  }
}
