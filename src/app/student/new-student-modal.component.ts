import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Student } from '../model/student';
import { StudentService } from './student.service';

@Component({
  selector: 'app-new-student-modal',
  templateUrl: './new-student-modal.component.html',
})
export class NewStudentModalComponent implements OnInit {
  newStudentForm!: FormGroup;
  pickedFile!: File;
  loading = false;

  @Output() studentSavedEvent = new EventEmitter<Student>();

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.newStudentForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      age: [null, [Validators.required]],
      bioFile: [null, [Validators.required]],
    });
  }

  saveStudent() {

    this.newStudentForm.markAllAsTouched();
    this.newStudentForm.get('bioFile')?.markAsDirty();

    if (this.newStudentForm.invalid) {
      return;
    }

    var student = this.newStudentForm.value;
    var formData = new FormData();
    formData.append(this.pickedFile.name, this.pickedFile);
    formData.append('File', this.pickedFile);

    this.loading = true;

    for (var item in student) {
      formData.append(item, student[item]);
    }

    this.studentService.postStudent(formData).subscribe(
      (student) => {
        this.toastr.success("Saved student successfully", "Success");
        this.loading = false;
        if (student) {
          this.studentSavedEvent.emit(student);
        }
      },
      (err) => (this.loading = false)
    );
  }

  filePickedEvent(event: any) {
    this.pickedFile = event.target.files[0];
  }
}
