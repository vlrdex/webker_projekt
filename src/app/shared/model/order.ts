import {User} from './User';
import {Product_item} from './product_item';

export interface Order{
  user: User
  products:Product_item[];
}
