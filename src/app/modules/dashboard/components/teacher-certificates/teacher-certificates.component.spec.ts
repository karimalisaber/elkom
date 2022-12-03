import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCertificatesComponent } from './teacher-certificates.component';

describe('TeacherCertificatesComponent', () => {
  let component: TeacherCertificatesComponent;
  let fixture: ComponentFixture<TeacherCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherCertificatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
