import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  userData: any;
  editForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.editForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password:new FormControl('')
    });
  }

  ngOnInit() {
    this.viewAll();
  }

  viewAll() {
    this.route.queryParams.subscribe((params) => {
      this.userData = JSON.parse(params['userData']);

      this.editForm.patchValue({
        firstName: this.userData['firstName'],
        lastName: this.userData['lastName'],
        email: this.userData['email'],
        password:this.userData['password'],
      });
    });
  }

  onSubmit() {
    console.log('Form submit:', this.editForm.value);
    const userList = JSON.parse(localStorage.getItem('userList') as any );
    const index = userList.findIndex((user: any) => user.email == this.userData.email);
    if (index > -1) {
      userList[index] = {
        firstName: this.editForm.value.firstName,
        lastName: this.editForm.value.lastName,
        email: this.editForm.value.email,
        password:this.editForm.value.password
      };
      localStorage.setItem('userList', JSON.stringify(userList));
    this.router.navigate(['/']);
    }
  }
}
