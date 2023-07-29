import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-addcart',
  templateUrl: './addcart.page.html',
  styleUrls: ['./addcart.page.scss'],
})
export class AddcartPage implements OnInit {
  saved_data: any;
  addbook: any;
  cartData: any;

  constructor(private service: ServicesService) { }

  ngOnInit() {
    this.saved_data = JSON.parse(localStorage.getItem('LoginUser') as any);
    console.log(this.saved_data);
    this.getCartItems();
  }

  getCartItems() {
    this.cartData = JSON.parse(localStorage.getItem('Cart') as any);
    this.addbook = this.cartData.filter((element: any) => element.email == this.saved_data.email);
    console.log(this.addbook);
  }

  addToCart(book: any) {
    let cartItems = JSON.parse(localStorage.getItem('Cart') as any);
    const index = cartItems.findIndex((element: any) => element.Author == book.Author && element.email == this.saved_data.email);
    if (index > -1) {
      cartItems[index].quantity++;
    } else {
      book.quantity = 1;
      cartItems.push(book);
    }
    localStorage.setItem('Cart', JSON.stringify(cartItems));
  }

  increaseQuantity(book: any) {
    book.quantity++;
    let cartItems = JSON.parse(localStorage.getItem('Cart') as any);
    const index = cartItems.findIndex((element: any) => element.Author == book.Author && element.email == this.saved_data.email);
    if (index > -1) {
      cartItems[index].quantity = book.quantity;
      localStorage.setItem('Cart', JSON.stringify(cartItems));
    }
  }

  decreaseQuantity(book: any) {
    if (book.quantity > 1) {
      book.quantity--;
      let cartItems = JSON.parse(localStorage.getItem('Cart') as any);
      const index = cartItems.findIndex((element: any) => element.Author == book.Author && element.email == this.saved_data.email);
      if (index > -1) {
        cartItems[index].quantity = book.quantity;
        localStorage.setItem('Cart', JSON.stringify(cartItems));
      }
    } else {
      this.service.presentAlert("Not below 1 allowed for quantity!");
    }
  }

  deleteItem(index: number) {
    const bookToDelete = this.addbook[index];
    const cartData = JSON.parse(localStorage.getItem('Cart') || '[]');
    const bookIndex = cartData.findIndex((element: any) => element.email === this.saved_data.email && element.Author === bookToDelete.Author);
    console.log(bookIndex);

    if (bookIndex > -1) {
      cartData.splice(bookIndex, 1);
      localStorage.setItem('Cart', JSON.stringify(cartData));
      this.addbook.splice(index, 1);
      this.service.presentAlert("Remove Successfully!");
    }
  }
}
