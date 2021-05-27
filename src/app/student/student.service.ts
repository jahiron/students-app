import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  studentsApi = 'http://localhost:5000/api/student';

  constructor(private http: HttpClient) {}

  getStudents(pageIndex: number, pageSize: number) {
    return this.http.get<Student[]>(
      `${this.studentsApi}?PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }
}
