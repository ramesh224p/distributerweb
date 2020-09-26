import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import swal from 'sweetalert2';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  pageSize = 10;
  pageNumber = 1;

  private url = `${environment.apiBaseUrl}/v1`;
  items: string[] ;
  id: string;
  i: string;
  getid: string;
  _id: string;
  employees: string[] ;
  employee: string[];
  employeesData: Array<any>;
  editForm: FormGroup;
  firstname: '';
  lastname: '';
  email: '';
  eage: '';
  address: '';
  number: '';
  emp_first_name: '';
  emp_last_name: '';
  emp_email: '';
  age: '';
  emp_address: '';
  password: '';
  emp_number: '';
  role: any;
  item: any;


  constructor(private http: HttpClient, private employeeservice: EmployeeService, private formBuilder: FormBuilder) { 
    this.formEdit();
    this.role = JSON.parse(localStorage.getItem('userData'))['data1']['emp_role'];
  }

  formEdit() {
    this.editForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      lastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      number: ['', Validators.required]
    });
  }

  get fval() {
    return this.editForm.controls;
  }

  empAdd() {
    this._id = undefined;
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.eage = '';
    this.address = '';
    this.number = '';
  }

  addEmp() {
    let itemobj = {
      emp_first_name : this.firstname,
      emp_last_name : this.lastname,
      emp_email: this.email,
      age: this.eage,
      emp_address: this.address,
      emp_number: this.number
    };

    this.employeeservice.createEmployee(itemobj).subscribe(data => {
      if ( data['status'] === true) {
        this.employees.push(data['data']['data']);
      }
    });
  }

  empEdit(item, index) {
    this._id = item.id;
    this.i = index;
    this.firstname = item.emp_first_name;
    this.lastname = item.emp_last_name;
    this.email = item.emp_email;
    this.eage = item.age;
    this.address = item.emp_address;
    this.number = item.emp_number;
  }

  editEmp(_id, i) {
    let itemedit = {
      emp_first_name: this.firstname,
      emp_last_name: this.lastname,
      emp_email: this.email,
      age: this.eage,
      emp_address: this.address,
      emp_number: this.number
    };
    
    this.employeeservice.editEmployee(this._id, itemedit).subscribe(data => {
      if ( data['status'] === true) {
        this.employeeservice.getEmployees().subscribe(data => {
          this.employees = data['data'];
        });
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }

  openModal(index, item, modal) {
    modal.open(index, item);
  }

  closeModal(modal) {
    modal.close();
  }

  onClose() {
    swal({
      type: 'success',
      title: 'Success!',
      text: 'close it!',
    });
  }

  loadData() {

    if (this.role === 1 || this.role === 2) {
      this.employeeservice.getEmployees().subscribe(data => {
        this.employees = data['data'];
      });
    } else {
      this.item = JSON.parse(localStorage.getItem('userData'))['data1'];
    }
  }

  employeesDelete(id, index) {
    this.employeeservice.deleteEmployee(id).subscribe(data => {
      if (data['status'] === true) {
        this.employees.splice(index, 1);
      }
    });
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

}
