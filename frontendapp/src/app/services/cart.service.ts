import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from './product.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart: Map<number, number> = new Map<number, number>(); //using Map to store cart, id is key, value is quantity
  
  
  constructor() {
    //get detail from localStorage
    this.refreshCart()
  }
  public  refreshCart(){
    const storedCart = localStorage.getItem(this.getCartKey());
    if (storedCart) {
      this.cart = new Map(JSON.parse(storedCart));      
    } else {
      this.cart = new Map<number, number>();
    }
  }
  private getCartKey():string {    
    const userResponseJSON = localStorage.getItem('user'); 
    const userResponse = JSON.parse(userResponseJSON!);  
    debugger
    return `cart:${userResponse?.id ?? ''}`;

  }
  addToCart(productId: number, quantity: number = 1): void {
    debugger
    if (this.cart.has(productId)) {
      // if product existed in cart, then increase quantity
      
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    } else {
      // if not exist, then add quantity
      this.cart.set(productId, quantity);
    }
     // store to localStorage
    this.saveCartToLocalStorage();
  }
  
  getCart(): Map<number, number> {
    return this.cart;
  }
  // store to localStorage
  private saveCartToLocalStorage(): void {
    debugger
    localStorage.setItem(this.getCartKey(), JSON.stringify(Array.from(this.cart.entries())));
  }  
  setCart(cart : Map<number, number>) {
    this.cart = cart ?? new Map<number, number>();
    this.saveCartToLocalStorage();
  }
  // delete cart and update localStorage
  clearCart(): void {
    this.cart.clear(); // delete entire cart
    this.saveCartToLocalStorage(); // save new cart to localstorage
  }
}
