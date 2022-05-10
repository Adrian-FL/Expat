import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareQrCodeComponent } from './qr-code.component';

describe('QrCodeComponent', () => {
  let component: ShareQrCodeComponent;
  let fixture: ComponentFixture<ShareQrCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareQrCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
