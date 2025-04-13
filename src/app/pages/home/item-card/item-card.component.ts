import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product_item} from '../../../shared/model/product_item';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent, MatCardFooter, MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-item-card',
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
    NgStyle
  ],
  templateUrl: './item-card.component.html',
  standalone: true,
  styleUrl: './item-card.component.scss'
})
export class ItemCardComponent {
  @Input() item!: Product_item;
  @Output() addToCart = new EventEmitter<Product_item>();

  onAddToCart(): void {
    this.addToCart.emit(this.item);
  }

}
