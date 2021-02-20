import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccPerAgeComponent } from './vacc-per-age.component';

describe('VaccPerAgeComponent', () => {
  let component: VaccPerAgeComponent;
  let fixture: ComponentFixture<VaccPerAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccPerAgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccPerAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
