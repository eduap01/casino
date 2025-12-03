import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipaPage } from './participa-page';

describe('ParticipaPage', () => {
  let component: ParticipaPage;
  let fixture: ComponentFixture<ParticipaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipaPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
