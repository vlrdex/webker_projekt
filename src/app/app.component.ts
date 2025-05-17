import { Component, OnInit , OnDestroy } from '@angular/core';
import {Router, RouterOutlet, RouterLink, NavigationEnd} from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatListItemIcon} from '@angular/material/list';
import {UserService} from './shared/services/user.service';
import {filter, Subscription} from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MenuComponent, MatListItemIcon],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy{
  currentUrl: string="";
  title = 'SzonyegShop';
  private routerSubscription: Subscription;

  constructor(protected userService:UserService,private router:Router) {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.url;
      });
  }


  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }

  logout(){
    this.userService.signOut()
  }

  isActive(route: string): boolean {
    return this.currentUrl === route;
  }

}
