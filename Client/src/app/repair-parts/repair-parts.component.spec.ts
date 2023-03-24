import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairPartsComponent } from './repair-parts.component';

describe('RepairPartsComponent', () => {
  let component: RepairPartsComponent;
  let fixture: ComponentFixture<RepairPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairPartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
