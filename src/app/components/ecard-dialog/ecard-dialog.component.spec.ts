import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcardDialogComponent } from './ecard-dialog.component';

describe('EcardDialogComponent', () => {
  let component: EcardDialogComponent;
  let fixture: ComponentFixture<EcardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcardDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
