import { Component,OnDestroy } from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatSuffix} from '@angular/material/input';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';

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
export class LoginComponent implements OnDestroy{
  email: FormControl<string | null>=new FormControl("");
  password : FormControl<string | null>=new FormControl("");
  error:String="";

  constructor(private userService:UserService,private router:Router) {
  }

  ngOnDestroy() {
    this.error="";
  }


  login(){
     this.error="";
   try {
     this.userService.signIn(typeof this.email.value === "string" ? this.email.value : "", typeof this.password.value === "string" ? this.password.value : "")
   }catch (e){
     this.error="Hibás email vagy jelszó"
   }
  }

}
