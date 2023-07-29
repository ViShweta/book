import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  showbook:any;
  constructor(
    private actionSheetCtrl:ActionSheetController,
    private service:ServicesService,
    private route :Router
  ) {
    
    

  }

  ionViewWillEnter(){
    const saved_data = JSON.parse(localStorage.getItem('AllBooks') as string) as any;
    this.showbook = saved_data;
    console.log(saved_data);
    console.log(this.showbook);
  }

  handleInput(event: any) {
    const query = event.target.value.trim().toLowerCase();
    if (query) {
      this.showbook = JSON.parse(localStorage.getItem('AllBooks') as any);
      this.showbook = this.showbook.filter((book: any) =>book.Author.toLowerCase().includes(query));
    } else {
      this.service.presentAlert(' Not Found any Author')
      this.showbook = JSON.parse(localStorage.getItem('AllBooks') as any);
      
    }
  }

  goTo(book: any) {
    console.log(book);
    const queryParams = {
      selectedBook: JSON.stringify(book) 
    };
    this.route.navigate(['/details'], { queryParams });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'My Profile',
          handler: () => {
            this.route.navigate(['/myprofile']);
          }
        },
        {
          text: 'Add Books',
          handler: () => {
            this.route.navigate(['/addbook']);
          }
        },
        {
          text: 'Logout',
          handler: () => {
            localStorage.removeItem('LoginUser');
            this.service.presentAlert("Logout SucessFully !!")
            this.route.navigate(['/login']);
          }
        },

        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }




}
