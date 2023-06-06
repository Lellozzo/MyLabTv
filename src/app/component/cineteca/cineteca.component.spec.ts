import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinetecaComponent } from './cineteca.component';

describe('CinetecaComponent', () => {
  let component: CinetecaComponent;
  let fixture: ComponentFixture<CinetecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinetecaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinetecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
