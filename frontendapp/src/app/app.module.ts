import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/detail-order/order.detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {TokenInterceptor} from './interceptors/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { UserProfileComponent } from './components/user-profile/user.profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { 
  HttpClientModule, 
  HTTP_INTERCEPTORS 
} from '@angular/common/http';
import { ContactComponent } from './components/contact/contact.component';
import { AdminComponent } from './components/admin/admin.component';
import { OrderAdminComponent } from './components/admin/order/order.admin.component';
import { CommonModule } from '@angular/common';
import { ProductAdminComponent } from './components/admin/product/product.admin.component';
import { CategoryAdminComponent } from './components/admin/category/category.admin.component';
import { AdminModule } from './components/admin/admin.module';


@NgModule({
  declarations: [    
    HomeComponent, 
    HeaderComponent,
    FooterComponent, 
    DetailProductComponent, 
    OrderComponent, 
    OrderDetailComponent, 
    LoginComponent, 
    RegisterComponent, 
    UserProfileComponent,
    AppComponent,
    ContactComponent,
    //ADMIN 
    // AdminComponent,
    // OrderAdminComponent,
    // ProductAdminComponent,
    // CategoryAdminComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    AdminModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [
    AppComponent
    // HomeComponent,
    //DetailProductComponent,
    // OrderComponent,
    //OrderDetailComponent,
    //LoginComponent,
    // RegisterComponent
  ]
})
export class AppModule { }
