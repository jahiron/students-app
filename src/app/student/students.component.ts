import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeriodicElement } from '../model/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
})
export class StudentsComponent implements OnInit {
  newStudentForm!: FormGroup;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource?: PeriodicElement[] = [
    {
      position: 1,
      name: 'name',
      weight: 10,
      symbol: 'as',
    },
    {
      position: 1,
      name: 'name',
      weight: 15,
      symbol: 'as',
    },
  ];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.newStudentForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
      bigraphyFile: [null, [Validators.required]],
    });
  }

  saveStudent() {
    this.newStudentForm.markAllAsTouched();
  }
}
