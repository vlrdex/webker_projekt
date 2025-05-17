import { Component,OnInit } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {Product_item} from '../../shared/model/product_item';
import {ItemService} from '../../shared/services/item-service.service';
import {AsyncPipe, NgClass} from '@angular/common';
import {NgModel} from '@angular/forms';
import {findAttributeOnElementWithAttrs} from '@angular/cdk/schematics';
import {MatButton} from '@angular/material/button';
import {AdminItemComponent} from './admin-item/admin-item.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [
    NgClass,
    MatIcon,
    AsyncPipe,
    MatButton,
    AdminItemComponent,
    RouterLink
  ],
  templateUrl: './admin.component.html',
  standalone: true,
  styleUrl: './admin.component.scss'
})
export class AdminComponent{
  products:Promise<Product_item[]>;

  constructor(protected itemServce:ItemService){
    this.products=this.itemServce.getItems()
  }


  update(a:Product_item){
    this.itemServce.updateProduct(a);
    this.products=this.itemServce.getItems();
  }

  onDelete(id:string){
    this.itemServce.deleteProduct(id);
    this.products=this.itemServce.getItems();
  }



}
