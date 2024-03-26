import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cmp-add-edit',
  templateUrl: './cmp-add-edit.component.html',
  styleUrls: ['./cmp-add-edit.component.css'],
})
export class CmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  education: string[] = ['liceu', 'facultate', 'master'];

  constructor(
    private _formBuilder: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<CmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = _formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(2)],
      ],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      education: ['', [Validators.required]],
      company: ['', [Validators.required, Validators.minLength(2)]],
      experience: ['', [Validators.required, Validators.minLength(1)]],
      package: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe(
            (emp) => {
              alert('Employee updated successfully');
              this._dialogRef.close(true);
            },
            (err) => {
              console.log(err);
            }
          );
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe(
          (emp) => {
            alert('Employee added successfully');
            this._dialogRef.close(true);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    }
  }
}
