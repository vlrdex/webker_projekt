import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product_item} from '../../../shared/model/product_item';
import {NgClass} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatLabel} from '@angular/material/form-field';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-admin-item',
  imports: [
    CommonModule,
    NgClass,
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatCheckbox
  ],
  templateUrl: './admin-item.component.html',
  standalone: true,
  styleUrl: './admin-item.component.scss'
})
export class AdminItemComponent implements OnInit{
  @Input() item!:Product_item;
  @Output() updateOutput=new EventEmitter<Product_item>;
  @Output() deleteEmit=new EventEmitter<string>
  productForm:FormGroup=new FormGroup([]);
  rejtett:boolean=true;

  constructor(){
  }

  ngOnInit() {
    this.productForm=new FormGroup({
      name : new FormControl<String>(this.item.name, [Validators.required]),
      price : new FormControl<Number>(this.item.price, [Validators.required, Validators.min(0)]),
      image : new FormControl<String> (this.item.image, [Validators.required]),
      description : new FormControl<String> (this.item.description, [Validators.required]),
      inStock : new FormControl<boolean>(this.item.quantity==1)
    })
  }

  onSubmit(){
    if (this.productForm.valid){
      var uj:Product_item={
        id:this.item.id,
        name:this.productForm.value.name,
        price:this.productForm.value.price,
        image:this.productForm.value.image,
        description:this.productForm.value.description,
        quantity:this.productForm.value.inStock===true?1:0
      }
      this.updateOutput.emit(uj);
    }
  }

  onDelete(){
    this.deleteEmit.emit(this.item.id)
  }

  csere(){
    this.rejtett=!this.rejtett;
  }



  get f() { return this.productForm.controls; }


}
