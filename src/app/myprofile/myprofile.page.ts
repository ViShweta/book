import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {

  login_data: any;

  constructor(private router: Router) { }

  goToEdit(login_data: any) {
    console.log('User Data:', login_data);
    const queryParams = {
      userData: JSON.stringify(login_data)
    };
    this.router.navigate(['/edit'], { queryParams });
  }
  ionViewWillEnter(){
    this.login_data = JSON.parse(localStorage.getItem('LoginUser') as any);
    console.log(this.login_data);
  }

  ngOnInit() {
    this.login_data = JSON.parse(localStorage.getItem('LoginUser') as any);
    console.log(this.login_data);
  }
}
