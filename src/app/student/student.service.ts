import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  studentApi = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStudents(pageIndex: number, pageSize: number) {
    return this.http.get<Student[]>(
      `${this.studentApi}?PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }

  postStudent(formData: FormData) {
    return this.http.post<Student>(
      `${this.studentApi}/PostStudent`,
      formData
    );
  }

  postMultipleStudents(file: File) {
    var formData = new FormData();
    formData.append('StudentXmlFile', file);
    return this.http.post<Student[]>(
      `${this.studentApi}/PostMultipleStudents`,
      formData
    );
  }

  downloadBio(fileUrl:string){
    return this.http.get
    (`${this.studentApi}/DownloadBioStudent?bioUrl=${fileUrl}`, {responseType: 'blob'})
  }
}
