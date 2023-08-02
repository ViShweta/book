import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.page.html',
  styleUrls: ['./addbook.page.scss'],
})
export class AddbookPage {
  bookForm: FormGroup;
  bookData: any[] = [];
  imageUrl: any;
  fileToUpload: any;
  book:any;

  constructor(
    private route: Router,
    private service: ServicesService,
    private router: ActivatedRoute,
  ) {
    this.bookForm = new FormGroup({
      Title: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      Price: new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      Author: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    });
  }



  onSubmit(value: any) {
    console.log(value);
    const saved_data = JSON.parse(localStorage.getItem('AllBooks') as string) as any;
    if (saved_data !== null) {
      this.bookData = saved_data;
    }
    this.bookData.push(value);
    if (this.fileToUpload) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        value.imageData = event.target.result;
        localStorage.setItem('AllBooks', JSON.stringify(this.bookData));
        this.bookForm.reset();
        this.service.presentAlert('Add Book Successfully');
        this.route.navigate(['/']);
      };
      reader.readAsDataURL(this.fileToUpload);
    } else {
      localStorage.setItem('AllBooks', JSON.stringify(this.bookData));
      this.bookForm.reset();
      this.service.presentAlert('Add Book Successfully');
      this.route.navigate(['/']);
    }
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
}
