import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ServicesService } from '../services.service';


@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.page.html',
  styleUrls: ['./addbook.page.scss'],
})
export class AddbookPage implements OnInit {
  bookForm:FormGroup;
  bookData:any=[];

  constructor(
    private route :Router,
    private service :ServicesService
  ) { 
    this.bookForm =new FormGroup({
      Title :new FormControl("",[Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      Price : new FormControl("",[Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      Author : new FormControl("",[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),

    });
  }

  onSubmit(value:any){
    console.log(value);
    const saved_data = JSON.parse(localStorage.getItem('AllBooks') as string) as any;
    if (saved_data !== null) {
      this.bookData = saved_data; 
    }
    this.bookData.push(value); 
    this.bookForm.reset();
    this.service.presentAlert('Add Book Successfully');
    this.route.navigate(['/']);
    localStorage.setItem('AllBooks', JSON.stringify(this.bookData)); 
  }
    

  ngOnInit() {
  }


  // takePicture = async () => {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: false,
  //     resultType: CameraResultType.Uri
  //   });
  //   this.imageUrl = image.webPath;
  //   localStorage.setItem('imageUrl', this.imageUrl);

  // };

}
