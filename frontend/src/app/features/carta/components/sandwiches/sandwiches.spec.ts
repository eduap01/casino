import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sandwiches } from './sandwiches';

describe('Sandwiches', () => {
  let component: Sandwiches;
  let fixture: ComponentFixture<Sandwiches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sandwiches]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sandwiches);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
