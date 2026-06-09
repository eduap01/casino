import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cocteles } from './cocteles';

describe('Cocteles', () => {
  let component: Cocteles;
  let fixture: ComponentFixture<Cocteles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cocteles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cocteles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
