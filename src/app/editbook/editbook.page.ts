import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.page.html',
  styleUrls: ['./editbook.page.scss'],
})
export class EditbookPage {
  editForm: FormGroup;
  book: any;
  imageUrl: any;
  fileToUpload: any;

  constructor(private router: ActivatedRoute) {
    this.editForm = new FormGroup({
      Title: new FormControl("", Validators.required, ),
      Price: new FormControl("", Validators.required, ),
      Author: new FormControl("", Validators.required, ),
    });
  }

  ionViewWillEnter() {
    this.router.queryParams.subscribe((params) => {
      this.book = JSON.parse(params['selectedBook']);
      console.log(this.book)
      this.editForm.patchValue({
        Title: this.book['Title'],
        Price: this.book['Price'],
        Author: this.book['Author'],
      });
    });
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (eventReader: any) => {
      this.imageUrl = eventReader.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  onSubmit(value: any) {
    if (this.editForm.valid) {
      const updatedBook = {...this.book,
        Title: value.Title,
        Price: value.Price,
        Author: value.Author,
        ImageUrl: this.imageUrl,
      };
      let allBooks = JSON.parse(localStorage.getItem('AllBooks') as any );
      const index = allBooks.findIndex((book: any) => book.id == updatedBook.id);
      if (index > -1) {
        allBooks[index] = updatedBook;
      } else {
        allBooks.push(updatedBook);
      }
      localStorage.setItem('AllBooks', JSON.stringify(allBooks));
  
      // this.router.navigate(['/list']); 
    }
  }
}
