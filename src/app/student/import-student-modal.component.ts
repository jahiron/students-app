import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../model/student';
import { StudentService } from './student.service';

@Component({
  selector: 'app-import-student-modal',
  templateUrl: './import-student-modal.component.html',
  styles: [],
})
export class ImportStudentModalComponent implements OnInit {
  importStudentsForm!: FormGroup;
  pickedFile!: File;
  loading = false;

  @Output() importStudentsSavedEvent = new EventEmitter<Student[]>();

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.importStudentsForm = this.formBuilder.group({
      bioFile: [null, [Validators.required]],
    });
  }

  importStudents() {
    this.importStudentsForm.get('bioFile')?.markAsDirty();
    if (this.importStudentsForm.invalid) {
      return;
    }
    this.loading = true;
    this.studentService.postMultipleStudents(this.pickedFile).subscribe(
      (students: Student[]) => {
        this.loading = false;
        this.importStudentsSavedEvent.emit(students);
      },
      (err) => (this.loading = false)
    );
  }

  filePickedEvent(event: any) {
    this.pickedFile = event.target.files[0];
  }
}
