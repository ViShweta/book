import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditbookPage } from './editbook.page';

describe('EditbookPage', () => {
  let component: EditbookPage;
  let fixture: ComponentFixture<EditbookPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditbookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
