import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../model/student';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
})
export class StudentsComponent implements OnInit {
  newStudentForm!: FormGroup;
  importStudentsForm!: FormGroup;
  xmlStudentsFile!: File;
  students: Student[] = [];
  _loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.getStudents();

    this.newStudentForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      age: [null, [Validators.required]],
      bigraphyFile: [null, [Validators.required]],
    });

    this.importStudentsForm = this.formBuilder.group({
      bigraphyFile: [null, [Validators.required]],
    });
  }

  getStudents() {
    this._loading = true;

    this.studentService.getStudents(1, 10).subscribe(
      (students) => {
        this.students = students;
        this._loading = false;
      },
      (err) => (this._loading = false)
    );
  }

  saveStudent() {
    this.newStudentForm.markAllAsTouched();
    var student = this.newStudentForm.value as Student;
    this.students.push(student);
  }

  importStudents() {
    this.importStudentsForm.markAllAsTouched();
    this.studentService
      .postMultipleStudents(this.xmlStudentsFile)
      .subscribe((students: Student[]) => {
        this.students.push(...students);
      });
  }

  filePickedEvent(event: any) {
    this.xmlStudentsFile = event.target.files[0];
  }
}
