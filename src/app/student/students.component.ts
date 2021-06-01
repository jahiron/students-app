import { Component, OnInit } from '@angular/core';
import { Student } from '../model/student';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  loading = false;
  pageIndex = 1;
  registerCount = 0;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.loading = true;
    this.studentService.getStudents(this.pageIndex, 10).subscribe(
      (students) => {
        this.students = students;
        this.loading = false;
        this.updateRegisterCount();
      },
      (err) => (this.loading = false)
    );
  }

  downloadBio(student: Student) {
    this.loading = true;
    this.studentService.downloadBio(student.bioFileUrl).subscribe(
      (file) => {
        console.log({ file });
        this.loading = false;
        var obj = window.URL.createObjectURL(file);
        window.open(obj);
      },
      (err) => (this.loading = false)
    );
  }

  changePagination(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.getStudents();
  }

  studentSaved(student: Student) {
    this.students = [...this.students, student];
    this.updateRegisterCount();
  }

  importStudentsSaved(students: Student[]) {
    this.students = [...this.students, ...students];
    this.updateRegisterCount();
  }

  updateRegisterCount(){
    this.registerCount = this.students.length > 0 ? this.students[0].registerCount : 0;
  }
}
