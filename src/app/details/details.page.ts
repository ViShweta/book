import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  book: any = [];
  login_data: any;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private service: ServicesService
  ) {}

  ionViewWillEnter() {
    this.router.queryParams.subscribe((params) => {
      this.book = JSON.parse(params['selectedBook']);
    });
  }

  addToCart(book: any) {
    this.login_data = JSON.parse(localStorage.getItem('LoginUser') as any);
    book.quantity = 1;
    book.email = this.login_data.email;
    let cartItems = JSON.parse(localStorage.getItem('Cart') as any);
    const existingBookIndex = cartItems.findIndex((item: any) => item.Author == book.Author && item.email == this.login_data.email
    );
    if (existingBookIndex > -1) {
      cartItems[existingBookIndex].quantity++;
    } else {
      cartItems.push(book);
    }
    localStorage.setItem('Cart', JSON.stringify(cartItems));
    this.service.presentAlert('Add book Successfully');
    this.route.navigate(['/addcart']);
  }

  ngOnInit() {
    this.login_data = JSON.parse(localStorage.getItem('LoginUser') as any);
    console.log(this.login_data);
  }
}
