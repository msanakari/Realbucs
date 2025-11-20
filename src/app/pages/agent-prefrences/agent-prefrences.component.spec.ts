import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPrefrencesComponent } from './agent-prefrences.component';

describe('AgentPrefrencesComponent', () => {
  let component: AgentPrefrencesComponent;
  let fixture: ComponentFixture<AgentPrefrencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentPrefrencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentPrefrencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
