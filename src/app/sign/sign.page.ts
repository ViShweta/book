import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage implements OnInit {

  UserForm:FormGroup;
  userData:any=[];

  constructor(
    private service :ServicesService,
    private router :Router
  ) { 
    
    this.UserForm =new FormGroup({
      firstName:new FormControl ('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      lastName: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      email: new FormControl ('', [Validators.required, Validators.email,]),
      password: new FormControl("",[Validators.required,Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,30}$/)]),

    });

  }

  onSubmit(value:any){
    var saved_data = JSON.parse(localStorage.getItem('userList') as string);
    console.log(saved_data);
    if (saved_data != null) {
      let index = saved_data.findIndex((element: any) => element.email == value.email);
      console.log(index);
      if (index > -1) {
        this.service.presentAlert('Email already registered.');
      } else {
        console.log('saved_data:', saved_data);
        saved_data = [...saved_data, ...[value]];
        localStorage.setItem('userList', JSON.stringify(saved_data));
        this.UserForm.reset();
        this.service.presentAlert('registered successfully.');
        this.router.navigate(['login/']);
      }
    } else {
      this.userData.push(value);
      localStorage.setItem('userList', JSON.stringify(this.userData));
      this.UserForm.reset();
      this.service.presentAlert('registered successfully.');
      this.router.navigate(['login/']);
    }
  }

  ngOnInit() {
  }

}
