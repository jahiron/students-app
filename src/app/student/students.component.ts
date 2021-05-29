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
  students: Student[] = [
    { id: 1, name: 'Jahiron', lastName:'Rodriguez', age: 45}
  ];
  _loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    //this.getStudents();

    this.newStudentForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      age: [null, [Validators.required]],
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
}
