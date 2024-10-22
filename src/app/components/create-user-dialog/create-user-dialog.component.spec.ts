import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserDialogComponentComponent } from './create-user-dialog.component';

describe('CreateUserDialogComponentComponent', () => {
  let component: CreateUserDialogComponentComponent;
  let fixture: ComponentFixture<CreateUserDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserDialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
