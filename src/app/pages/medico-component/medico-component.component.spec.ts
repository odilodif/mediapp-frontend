import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoComponentComponent } from './medico-component.component';

describe('MedicoComponentComponent', () => {
  let component: MedicoComponentComponent;
  let fixture: ComponentFixture<MedicoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
