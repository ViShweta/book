import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loginuser:any;
  constructor(
    private route:Router
  ) {
    this.loginuser= JSON.parse(localStorage.getItem('LoginUser') as string);
    console.log(this.loginuser);
    if(this.loginuser !=undefined){
      this.route.navigate(['/home']);
        }else{
          this.route.navigate(['/login']);
       }
  }
}
