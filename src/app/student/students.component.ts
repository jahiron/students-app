import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../model/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
})
export class StudentsComponent implements OnInit {
  newStudentForm!: FormGroup;
  students: Student[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.newStudentForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      birthdate: [null, [Validators.required]],
      bigraphyFile: [null, [Validators.required]],
    });
  }

  saveStudent() {
    this.newStudentForm.markAllAsTouched();
    var student = this.newStudentForm.value as Student;
    this.students.push(student);
  }
}
