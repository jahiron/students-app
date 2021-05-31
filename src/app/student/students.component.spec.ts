import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Student } from '../model/student';
import { StudentService } from './student.service';

import { StudentsComponent } from './students.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;
  let studentServiceSpy: jasmine.SpyObj<StudentService>;

  let students: Student[] = [
    {
      id: 1,
      name: 'John',
      lastName: 'Smith',
      age: 25,
      bioFileUrl: 'C://biofile.pdf',
      registerUser: 'user',
    },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj(['getStudents', 'downloadBio']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        NgxPaginationModule,
      ],
      declarations: [
        StudentsComponent,
        NewStudentModalComponent,
        MockImportStudentModalComponent,
      ],
      providers: [{ provide: StudentService, useValue: spy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;

    studentServiceSpy = TestBed.inject(
      StudentService
    ) as jasmine.SpyObj<StudentService>;

    studentServiceSpy.getStudents.and.returnValue(of(students));

    let blob = new Blob();
    studentServiceSpy.downloadBio.and.returnValue(of(blob));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should download bio file', () => {
    spyOn(window, 'open');
    let butonBioFile = fixture.nativeElement.querySelector('a');
    console.log({ butonBioFile });
    butonBioFile.click();
    expect(window.open).toHaveBeenCalled();
  });
});

@Component({
  selector: 'app-import-student-modal',
  template: `<p>mock for ImportStudentModalCompoent</p>`,
})
class MockImportStudentModalComponent {}

@Component({
  selector: 'app-new-student-modal',
  template: `<p>mock for NewStudentModalCompoent</p>`,
})
class NewStudentModalComponent {}
