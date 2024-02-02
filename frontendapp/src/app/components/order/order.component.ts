import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { environment } from 'src/app/environments/environment';
import { OrderDTO } from '../../dtos/order/order.dto';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  cartItems: { product: Product, quantity: number }[] = [];
  couponCode: string = ''; // coupon
  totalAmount: number = 0; // total amount
  orderData: OrderDTO = {
    user_id: 1, 
    fullname: '', // get from form
    email: '', //get from form
    phone_number: '', // get from form
    address: '', // get from form
    note: '', // additional
    total_money: 0, // calculate base on cart and coupon
    payment_method: 'cod', // COD as default
    shipping_method: 'express', // Express as default
    coupon_code: '', //get from form
    cart_items: []
  };

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService
  ) {}
  

  ngOnInit(): void {    
    // get list product from cart
    debugger
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys()); 

    // call service to get list product from ID
    debugger
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {            
        debugger
        
        this.cartItems = productIds.map((productId) => {
          debugger
          const product = products.find((p) => p.id === productId);
          if (product) {
            product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }          
          return {
            product: product!,
            quantity: cart.get(productId)!
          };
        });
        console.log('abc123');
      },
      complete: () => {
        debugger;
        this.calculateTotal()
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
      }
    });        
  }
  placeOrder() {
    this.orderService.placeOrder(this.orderData).subscribe({
      next: (response) => {            
        debugger                
        console.log('Order successfully !');
      },
      complete: () => {
        debugger;
        this.calculateTotal()
      },
      error: (error: any) => {
        debugger;
        console.error('Order error :', error);
      }
    });       
  }  
  
  // calculate total money
  calculateTotal(): void {
      this.totalAmount = this.cartItems.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
      );
  }


  applyCoupon(): void {
      //update total money if has coupon
  }
}
