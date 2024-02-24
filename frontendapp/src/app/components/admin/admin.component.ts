import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/responses/user/user.response';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  //adminComponent: string = 'orders';
  userResponse?:UserResponse | null;
  constructor(
    private userService: UserService,       
    private tokenService: TokenService,    
    private router: Router,
  ) {
    
   }
  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();    
    //default router
    if (this.router.url === '/admin') {
      this.router.navigate(['/admin/orders']);
    }
   }  
  logout() {
    this.userService.removeUserFromLocalStorage();
    this.tokenService.removeToken();
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    this.router.navigate(['/']);    
    alert('Logged out successfully !~');
  }
  showAdminComponent(componentName: string): void {
    if(componentName === 'orders') {
      this.router.navigate(['/admin/orders']);
    } else if(componentName === 'categories') {
      this.router.navigate(['/admin/categories']);
    }else if(componentName === 'products') {
      this.router.navigate(['/admin/products']);
    }
  }
}