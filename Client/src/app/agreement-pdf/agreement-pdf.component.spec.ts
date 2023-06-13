import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementPdfComponent } from './agreement-pdf.component';

describe('AgreementPdfComponent', () => {
  let component: AgreementPdfComponent;
  let fixture: ComponentFixture<AgreementPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreementPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
