import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationAddComponent } from './accommodation-add.component';

describe('AccommodationAddComponent', () => {
  let component: AccommodationAddComponent;
  let fixture: ComponentFixture<AccommodationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccommodationAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
