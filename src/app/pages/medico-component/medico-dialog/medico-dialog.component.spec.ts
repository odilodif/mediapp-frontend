import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoDialogComponent } from './medico-dialog.component';

describe('MedicoDialogComponent', () => {
  let component: MedicoDialogComponent;
  let fixture: ComponentFixture<MedicoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
