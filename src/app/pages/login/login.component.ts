import { Component } from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatSuffix} from '@angular/material/input';
import {RouterLink} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatButton,
    MatSuffix,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: FormControl<string | null>=new FormControl("");
  password : FormControl<string | null>=new FormControl("");
  error:String="";

   login(){
     this.error="";

    if(this.email.value!=="tesz@gmail.com" || this.password.value!=="1234"){
      this.error="Hibás felhasználónév vagy jelszó";
    }
  }

}
