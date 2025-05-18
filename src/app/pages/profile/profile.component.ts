import { Component } from '@angular/core';
import {User} from '../../shared/model/User';
import {Order} from '../../shared/model/order';
import {MatCard,MatCardTitle,MatCardContent} from '@angular/material/card';
import {MatLabel} from '@angular/material/form-field';
import {Auth} from '@angular/fire/auth';
import {UserService} from '../../shared/services/user.service';
import {AsyncPipe} from '@angular/common';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatButton} from '@angular/material/button';
import {CartService} from '../../shared/services/cart-service.service';
import {FormsModule} from '@angular/forms';
import {getTreeNoValidDataSourceError} from '@angular/cdk/tree';

@Component({
  selector: 'app-profile',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatLabel,
    AsyncPipe,
    MatRadioButton,
    MatButton,
    FormsModule,
    MatRadioGroup
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user:User={name:"alma",email:"teszt",admin:false};
  orders:Promise<Order[]>;
  sortType:String="date";

  constructor(private auth:Auth,private userService : UserService,private cartService:CartService){
    this.user=userService.getUserFromLocalStorage();
    this.orders=this.cartService.getOrdersByUserIdOrderByDate(auth.currentUser?.uid ? auth.currentUser.uid : "");
  }

  onSortChange(){
    if (this.sortType==="date"){
      this.orders=this.cartService.getOrdersByUserIdOrderByDate(this.auth.currentUser?.uid ? this.auth.currentUser.uid : "");
    }else{
      this.orders=this.cartService.getOrdersByUserIdOrderByPrice(this.auth.currentUser?.uid ? this.auth.currentUser.uid : "");
    }
  }
}
