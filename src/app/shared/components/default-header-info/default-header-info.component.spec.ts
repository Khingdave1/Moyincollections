import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultHeaderInfoComponent } from './default-header-info.component';

describe('DefaultHeaderInfoComponent', () => {
  let component: DefaultHeaderInfoComponent;
  let fixture: ComponentFixture<DefaultHeaderInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultHeaderInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultHeaderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
