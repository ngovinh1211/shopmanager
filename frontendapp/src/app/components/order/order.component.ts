import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { environment } from 'src/environments/environment';
import { OrderDTO } from '../../dtos/order/order.dto';
import { Order } from 'src/app/models/order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    user_id: 0,
    fullname: '', // get from form
    email: '', //get from form
    phone_number: '', // get from form
    address: '', // get from form
    note: '', // additional
    total_money: 0, // calculate base on cart and coupon
    payment_method: 'cod', // COD as default
    status: '',
    shipping_date: new Date(),
    shipping_method: 'express', // Express as default
    coupon_code: '', //get from form
    cart_items: []
  };

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.orderForm = this.formBuilder.group({
      fullname: ['', Validators.required], //full name is formControl required      
      email: ['', [Validators.email]], // using Validators.email 
      phone_number: ['', [Validators.required, Validators.minLength(6)]], // phone_number required and at least 6 characters
      address: ['', [Validators.required, Validators.minLength(5)]], // address required and at least 5 characters
      note: [''],
      shipping_method: [''],
      payment_method: ['']
    });
  }


  ngOnInit(): void {
    debugger
    this.orderData.user_id = this.tokenService.getUserId();    
    // get list product from cart
    debugger
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());

    // call service to get list product from ID
    debugger
    if(productIds.length === 0) {
      return;
    } 
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
        console.log('get product test');
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
    if (this.orderForm.errors == null) {
      /*
      this.orderData.fullname = this.orderForm.get('fullname')!.value;
      this.orderData.email = this.orderForm.get('email')!.value;
      this.orderData.phone_number = this.orderForm.get('phone_number')!.value;
      this.orderData.address = this.orderForm.get('address')!.value;
      this.orderData.note = this.orderForm.get('note')!.value;
      this.orderData.shipping_method = this.orderForm.get('shipping_method')!.value;
      this.orderData.payment_method = this.orderForm.get('payment_method')!.value;
      */
      // using spread (...) operator
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value
      };
      this.orderData.cart_items = this.cartItems.map(cartItem => ({
        product_id: cartItem.product.id,
        quantity: cartItem.quantity
      }));
      this.orderData.total_money =  this.totalAmount;
      // Infomation validated
      this.orderService.placeOrder(this.orderData).subscribe({
        next: (response:Order) => {
          debugger;          
          alert('Order successfully ~~~!');
          this.cartService.clearCart();
          this.router.navigate(['/']);
        },
        complete: () => {
          debugger;
          this.calculateTotal();
        },
        error: (error: any) => {
          debugger;
          alert(`Order error: ${error}`);
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
