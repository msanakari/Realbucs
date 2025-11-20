import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellFlowComponent } from './sell-flow.component';

describe('SellFlowComponent', () => {
  let component: SellFlowComponent;
  let fixture: ComponentFixture<SellFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
