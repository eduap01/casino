import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Especiales } from './especiales';

describe('Especiales', () => {
  let component: Especiales;
  let fixture: ComponentFixture<Especiales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Especiales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Especiales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
