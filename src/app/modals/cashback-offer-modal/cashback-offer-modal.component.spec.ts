import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashbackOfferModalComponent } from './cashback-offer-modal.component';

describe('CashbackOfferModalComponent', () => {
  let component: CashbackOfferModalComponent;
  let fixture: ComponentFixture<CashbackOfferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashbackOfferModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashbackOfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
