import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Molletes } from './molletes';

describe('Molletes', () => {
  let component: Molletes;
  let fixture: ComponentFixture<Molletes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Molletes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Molletes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
