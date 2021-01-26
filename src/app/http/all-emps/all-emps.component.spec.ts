import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmpsComponent } from './all-emps.component';

describe('AllEmpsComponent', () => {
  let component: AllEmpsComponent;
  let fixture: ComponentFixture<AllEmpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllEmpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEmpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
