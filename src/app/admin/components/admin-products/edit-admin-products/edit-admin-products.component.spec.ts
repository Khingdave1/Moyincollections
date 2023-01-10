import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminProductsComponent } from './edit-admin-products.component';

describe('EditAdminProductsComponent', () => {
  let component: EditAdminProductsComponent;
  let fixture: ComponentFixture<EditAdminProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
