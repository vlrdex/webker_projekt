import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {User} from '../../shared/model/User';

@Component({
  selector: 'app-regist',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  templateUrl: './regist.component.html',
  standalone: true,
  styleUrl: './regist.component.scss'
})
export class RegistComponent implements OnInit{

  passwordStrength: string = '';
  error:string="";
  registForm = new FormGroup({
    email: new FormControl<string>("", [Validators.required, Validators.email]),
    name: new FormControl<string>("", [Validators.required, Validators.minLength(2)]),
    password: new FormControl<string>("", [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl<string>("", [Validators.required, Validators.minLength(6)]),
  });

  ngOnInit(): void {

    this.registForm.get('password')?.valueChanges.subscribe(value => {
      if (value !== null) {
        this.checkPasswordStrength(value);
      } else {
        this.passwordStrength = '';
      }
    });
  }

  regist(){
    if(this.registForm.invalid){
      this.error="Hibás adatok";
    }

    if(this.registForm.valid){
      if(this.registForm.value.password != this.registForm.value.rePassword){
        this.error="Nem egyezik a jelszó és ellenőrző jelszó";
        return;
      }

      const user: User={
        email : this.registForm.value.email || "",
        password :this.registForm.value.password || "",
        name:this.registForm.value.name || ""
      }

      console.log(user);
    }
  }

  checkPasswordStrength(password: string): void {
    if (!password) {
      this.passwordStrength = '';
      return;
    }

    const lengthScore = password.length * 4;
    const hasLower = /[a-z]/.test(password) ? 1 : 0;
    const hasUpper = /[A-Z]/.test(password) ? 1 : 0;
    const hasDigit = /[0-9]/.test(password) ? 1 : 0;
    const hasSpecial = /[^\w\s]/.test(password) ? 1 : 0;

    const complexityScore = (hasLower + hasUpper + hasDigit + hasSpecial) * 4;
    const totalScore = lengthScore + complexityScore;

    if (totalScore < 30) {
      this.passwordStrength = 'Gyenge';
    } else if (totalScore < 60) {
      this.passwordStrength = 'Közepes';
    } else {
      this.passwordStrength = 'Erős';
    }
  }



}
