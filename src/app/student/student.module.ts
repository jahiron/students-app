import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewStudentModalComponent } from './new-student-modal.component';
import { ImportStudentModalComponent } from './import-student-modal.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  declarations: [StudentsComponent, NewStudentModalComponent, ImportStudentModalComponent],
})
export class StudentModule {}
