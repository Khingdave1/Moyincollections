import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminProductComponent } from './edit-admin-product.component';

describe('EditAdminProductComponent', () => {
  let component: EditAdminProductComponent;
  let fixture: ComponentFixture<EditAdminProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdminProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
