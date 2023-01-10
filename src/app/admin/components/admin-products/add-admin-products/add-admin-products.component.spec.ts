import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminProductsComponent } from './add-admin-products.component';

describe('AddAdminProductsComponent', () => {
  let component: AddAdminProductsComponent;
  let fixture: ComponentFixture<AddAdminProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
