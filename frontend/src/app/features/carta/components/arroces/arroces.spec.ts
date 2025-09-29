import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Arroces } from './arroces';

describe('Arroces', () => {
  let component: Arroces;
  let fixture: ComponentFixture<Arroces>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Arroces]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Arroces);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
