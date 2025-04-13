import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartItem} from '../../../shared/model/cart';
import {Product_item} from '../../../shared/model/product_item';
import {NumberShortPipe} from '../../../shared/pipes/number-short.pipe';
import {MatIconButton} from '@angular/material/button';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [
    NumberShortPipe,
    MatIconButton,
    NgStyle
  ],
  templateUrl: './cart-item.component.html',
  standalone: true,
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() item!:CartItem;
  @Output() changeQuantityP=new EventEmitter<Product_item>
  @Output() changeQuantityM=new EventEmitter<Product_item>
  @Output() removeItem=new EventEmitter<Product_item>


  onChangeQuantityP(){
    this.changeQuantityP.emit(this.item.product);
  }

  onChangeQuantityM(){
    this.changeQuantityM.emit(this.item.product);
  }

  onRemoveItem(){
    this.removeItem.emit(this.item.product);
  }

}
