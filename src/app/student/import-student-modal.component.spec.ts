import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { Student } from '../model/student';

import { ImportStudentModalComponent } from './import-student-modal.component';
import { StudentService } from './student.service';

describe('ImportStudentModalComponent', () => {
  let component: ImportStudentModalComponent;
  let fixture: ComponentFixture<ImportStudentModalComponent>;
  let studentServiceMock = jasmine.createSpyObj(['postMultipleStudents']);
  let student: Student = {
    id: 1,
    name: 'John',
    lastName: 'Smith',
    age: 25,
    bioFileUrl: 'C://biofile.pdf',
    registerUser: 'user',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [ImportStudentModalComponent],
      providers: [{ provide: StudentService, useValue: studentServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportStudentModalComponent);
    component = fixture.componentInstance;

    studentServiceMock.postMultipleStudents.and.returnValue(of(student));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
