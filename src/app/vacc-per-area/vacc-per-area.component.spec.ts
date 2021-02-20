import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccPerAreaComponent } from './vacc-per-area.component';

describe('VaccPerAreaComponent', () => {
  let component: VaccPerAreaComponent;
  let fixture: ComponentFixture<VaccPerAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccPerAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccPerAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
