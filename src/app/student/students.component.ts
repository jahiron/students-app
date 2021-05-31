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
  pickedFile!: File;
  students: Student[] = [];
  loading = false;

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
      bioFile: [null, [Validators.required]],
    });

    this.importStudentsForm = this.formBuilder.group({
      bioFile: [null, [Validators.required]],
    });
  }

  getStudents() {
    this.loading = true;

    this.studentService.getStudents(1, 10).subscribe(
      (students) => {
        this.students = students;
        this.loading = false;
      },
      (err) => (this.loading = false)
    );
  }

  saveStudent() {
    debugger
    this.newStudentForm.markAllAsTouched();
    
    if(this.newStudentForm.invalid){
      return;
    }

    var student = this.newStudentForm.value;

    var formData = new FormData();

    formData.append(this.pickedFile.name, this.pickedFile);
    formData.append("File", this.pickedFile);
    
    for(var item in student){
      formData.append(item, student[item])
    }
    debugger

    this.studentService.postStudent(formData).subscribe(student => {
      if(student){
    debugger

        this.students.push(student);
      }
    });
  }

  importStudents() {
    this.importStudentsForm.markAllAsTouched();
    this.studentService
      .postMultipleStudents(this.pickedFile)
      .subscribe((students: Student[]) => {
        this.students.push(...students);
      });
  }

  filePickedEvent(event: any) {
    this.pickedFile = event.target.files[0];
  }

  downloadBio(student: Student){
    this.studentService.downloadBio(student.bioFileUrl).subscribe(file => {
     var obj = window.URL.createObjectURL(file);
      window.open(obj);
    });
  }
}