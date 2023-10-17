import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistdashboardComponent } from './pharmacistdashboard.component';

describe('PharmacistdashboardComponent', () => {
  let component: PharmacistdashboardComponent;
  let fixture: ComponentFixture<PharmacistdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PharmacistdashboardComponent]
    });
    fixture = TestBed.createComponent(PharmacistdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
