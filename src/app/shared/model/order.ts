import {User} from './User';
import {Product_item} from './product_item';
import { Timestamp } from '@angular/fire/firestore'

export interface Order{
  user: String
  products:Product_item[];
  date:Timestamp;
  total:number;
}
