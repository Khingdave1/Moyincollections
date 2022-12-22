import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoBackTopComponent } from './go-back-top.component';

describe('GoBackTopComponent', () => {
  let component: GoBackTopComponent;
  let fixture: ComponentFixture<GoBackTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoBackTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoBackTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
