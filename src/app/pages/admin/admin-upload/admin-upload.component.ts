import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {ItemService} from '../../../shared/services/item-service.service';
import {Product_item} from '../../../shared/model/product_item';
import {Router} from '@angular/router';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-admin-upload',
  imports: [
    MatFormFieldModule,
    MatButton,
    MatCheckbox,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './admin-upload.component.html',
  standalone: true,
  styleUrl: './admin-upload.component.scss'
})
export class AdminUploadComponent {
  productForm:FormGroup=new FormGroup({
    name : new FormControl<String>("", [Validators.required]),
    price : new FormControl<Number>(0, [Validators.required, Validators.min(0)]),
    image : new FormControl<String> ("", [Validators.required]),
    description : new FormControl<String> ("", [Validators.required]),
    inStock : new FormControl<boolean>(false)
  });

  constructor(private itemService:ItemService,private router:Router){
  }

  onSubmit(){
    if (this.productForm.valid){
      var uj:Product_item={
        id:"",
        name:this.productForm.value.name,
        price:this.productForm.value.price,
        image:this.productForm.value.image,
        description:this.productForm.value.description,
        quantity:this.productForm.value.inStock===true?1:0
      }
      this.itemService.saveProduct(uj);
      this.router.navigate(["/admin"])
    }
  }

}
