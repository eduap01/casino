import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zipotes } from './zipotes';

describe('Zipotes', () => {
  let component: Zipotes;
  let fixture: ComponentFixture<Zipotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Zipotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Zipotes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
