import { Component } from '@angular/core';
import {User} from '../../shared/model/User';
import {Order} from '../../shared/model/order';
import {MatCard,MatCardTitle,MatCardContent} from '@angular/material/card';
import {MatLabel} from '@angular/material/form-field';

@Component({
  selector: 'app-profile',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatLabel
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user:User={name:"alma",email:"teszt",admin:false};
  orders:Order[]=[];
}
