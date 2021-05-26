import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatTableModule],
  declarations: [StudentsComponent],
})
export class StudentModule {}
