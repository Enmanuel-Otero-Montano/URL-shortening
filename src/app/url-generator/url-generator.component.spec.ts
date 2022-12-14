import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlGeneratorComponent } from './url-generator.component';

describe('UrlGeneratorComponent', () => {
  let component: UrlGeneratorComponent;
  let fixture: ComponentFixture<UrlGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrlGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
