import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddcartPage } from './addcart.page';

describe('AddcartPage', () => {
  let component: AddcartPage;
  let fixture: ComponentFixture<AddcartPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddcartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
