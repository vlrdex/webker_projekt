import { Component,OnInit } from '@angular/core';
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
import {ItemService} from '../../shared/services/item-service.service';
import {Observable} from 'rxjs';


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
export class HomeComponent implements OnInit{

  products: Product_item[]=[];

  constructor(private itemsService: ItemService) {
  }

  async ngOnInit(): Promise<void> {
    this.products= await this.itemsService.getItems();
  }


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
