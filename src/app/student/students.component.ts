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

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.loading = true;
    this.studentService.getStudents(this.pageIndex, 10).subscribe(
      (students) => {
        console.log({ students });
        this.students = students;
        this.loading = false;
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
  }

  importStudentsSaved(students: Student[]) {
    this.students = [...this.students, ...students];
  }
}
