import {User} from './User';
import {Product_item} from './product_item';
import {Timestamp} from 'rxjs';

export interface Order{
  user: User
  products:String[];
  date:any;
  total:number;
}
