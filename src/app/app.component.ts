import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CmpAddEditComponent } from './cmp-add-edit/cmp-add-edit.component';
import { EmployeeService } from './service/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _empGet: EmployeeService) {}
  ngOnInit(): void {
    this.getEmplyeeList();
  }

  openAndEdit() {
    const dialogRef = this._dialog.open(CmpAddEditComponent);
    dialogRef.afterClosed().subscribe(
      (val) => {
        if (val) {
          this.getEmplyeeList();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getEmplyeeList() {
    this._empGet.getEmployee().subscribe(
      (empList: any) => {
        this.dataSource = new MatTableDataSource(empList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        console.error();
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmployee(id: number) {
    this._empGet.deleteEmployee(id).subscribe(
      (data) => {
        alert('Employee deleted successfully');
        this.getEmplyeeList();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editButton(data: any) {
    const dialogRef = this._dialog.open(CmpAddEditComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe(
      (val) => {
        if (val) {
          this.getEmplyeeList();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
