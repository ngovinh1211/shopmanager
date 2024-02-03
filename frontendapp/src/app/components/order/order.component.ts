import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { environment } from 'src/app/environments/environment';
import { OrderDTO } from '../../dtos/order/order.dto';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  orderForm: FormGroup;
  cartItems: { product: Product, quantity: number }[] = [];
  couponCode: string = ''; // coupon
  totalAmount: number = 0; // total amount
  orderData: OrderDTO = {
    user_id: 3,
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
    private orderService: OrderService,
    private fb: FormBuilder
  ) {
    this.orderForm = this.fb.group({
      fullname: ['vinh', Validators.required], //full name is formControl required      
      email: ['vinh123@gmail.com', [Validators.email]], // using Validators.email 
      phone_number: ['99955595', [Validators.required, Validators.minLength(6)]], // phone_number required and at least 6 characters
      address: ['nhà x ngõ y', [Validators.required, Validators.minLength(5)]], // address required and at least 5 characters
      note: ['high price '],
      shipping_method: ['express'],
      payment_method: ['cod']
    });
  }


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
    debugger
    if (this.orderForm.valid) {
      // Gán giá trị từ form vào đối tượng orderData
      /*
      this.orderData.fullname = this.orderForm.get('fullname')!.value;
      this.orderData.email = this.orderForm.get('email')!.value;
      this.orderData.phone_number = this.orderForm.get('phone_number')!.value;
      this.orderData.address = this.orderForm.get('address')!.value;
      this.orderData.note = this.orderForm.get('note')!.value;
      this.orderData.shipping_method = this.orderForm.get('shipping_method')!.value;
      this.orderData.payment_method = this.orderForm.get('payment_method')!.value;
      */
      // Sử dụng toán tử spread (...) để sao chép giá trị từ form vào orderData
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value
      };
      this.orderData.cart_items = this.cartItems.map(cartItem => ({
        product_id: cartItem.product.id,
        quantity: cartItem.quantity
      }));
      // Infomation validated
      this.orderService.placeOrder(this.orderData).subscribe({
        next: (response) => {
          debugger;
          console.log('Order successfully ~!');
        },
        complete: () => {
          debugger;
          this.calculateTotal();
        },
        error: (error: any) => {
          debugger;
          console.error('Order error:', error);
        },
      });
    } else {
      // Display error message
      alert('Information is not available, please check !');
    }        
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
