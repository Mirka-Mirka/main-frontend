import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationAllComponent } from './reservation-all.component';

describe('ReservationAllComponent', () => {
  let component: ReservationAllComponent;
  let fixture: ComponentFixture<ReservationAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
