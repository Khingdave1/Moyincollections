import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAdminProductsComponent } from './display-admin-products.component';

describe('DisplayAdminProductsComponent', () => {
  let component: DisplayAdminProductsComponent;
  let fixture: ComponentFixture<DisplayAdminProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAdminProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAdminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
