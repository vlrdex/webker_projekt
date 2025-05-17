import { Routes } from '@angular/router';
import {adminGuard, authGuard, publicGuard} from './shared/auth/authguard.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [publicGuard]
  },
  {
    path: 'regist',
    loadComponent: () => import('./pages/regist/regist.component').then(m => m.RegistComponent),
    canActivate: [publicGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/create',
    loadComponent: () => import('./pages/admin/admin-upload/admin-upload.component').then(m => m.AdminUploadComponent),
    canActivate: [adminGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () => import('./shared/error/error.component').then(m => m.ErrorComponent)
  },
];
