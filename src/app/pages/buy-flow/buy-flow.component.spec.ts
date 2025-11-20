import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyFlowComponent } from './buy-flow.component';

describe('BuyFlowComponent', () => {
  let component: BuyFlowComponent;
  let fixture: ComponentFixture<BuyFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
