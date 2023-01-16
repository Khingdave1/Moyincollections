import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAdminCategoriesComponent } from './display-admin-categories.component';

describe('DisplayAdminCategoriesComponent', () => {
  let component: DisplayAdminCategoriesComponent;
  let fixture: ComponentFixture<DisplayAdminCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAdminCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAdminCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
