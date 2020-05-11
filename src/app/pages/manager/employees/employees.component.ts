import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
  _id:string;
  employees: string[] ;
  employee: string[];
  employeesData: Array<any>;
  editForm: FormGroup;
  firstname:'';
  lastname:'';
  email:'';
  eage:'';
  address:'';
  number:'';
  emp_first_name: '';
  emp_last_name: '';
  emp_email: '';
  age: '';
  emp_address: '';
  password:'';
  emp_number: '';


  constructor(private http: HttpClient, private employeeservice: EmployeeService, private formBuilder: FormBuilder) { 
    this.formEdit();
  }

  formEdit(){
    this.editForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      lastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]],
      number: ['', Validators.required]
    });
  }

  get fval() {
    return this.editForm.controls;
  }

  empAdd(){
    this._id=undefined;
    this.firstname='';
    this.lastname='';
    this.email='';
    this.eage='';
    this.address='';
    this.number='';
    console.log('empAdd');
  }

  addEmp(){
    var itemobj={
      emp_first_name : this.firstname,
      emp_last_name : this.lastname,
      emp_email:this.email,
      age:this.eage,
      emp_address:this.address,
      emp_number:this.number
    };

    // console.log(itemobj)

    this.employeeservice.createEmployee(itemobj).subscribe(data => {
      console.log(data);
      if( data['status'] == true){
        this.employees.push(data['data']['data']);
        console.log(this.employees);
      }
    })
  }

  empEdit(item, index){
    this._id=item.id;
    this.i=index;
    console.log(index)
    console.log(item['id']);
    this.firstname=item.emp_first_name;
    this.lastname=item.emp_last_name;
    this.email=item.emp_email;
    this.eage=item.age;
    this.address=item.emp_address;
    this.number=item.emp_number;
  }

  editEmp(_id, i){
    console.log(this._id, this.i);
    var itemedit={
      emp_first_name:this.firstname,
      emp_last_name:this.lastname,
      emp_email:this.email,
      age:this.eage,
      emp_address:this.address,
      emp_number:this.number
    }
    
    console.log(itemedit);
    this.employeeservice.editEmployee(this._id, itemedit).subscribe(data => {
      if( data['status'] == true){
        console.log(data['data']['data']);
        console.log(this.i);
        // this.employees.push(data['data']['data'] );
        console.log(this.employees);
      }
    })
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
    this.employeeservice.getEmployees().subscribe(data => {
      this.employees = data['data'];
      console.log(this.employees);
    })
   
  }

  employeesDelete(id, index){
    console.log(id, index);
    this.employeeservice.deleteEmployee(id).subscribe(data => {
      console.log(this.employees, data)
      if(data['status'] == true){
        this.employees.splice(index, 1);
        console.log(this.employees)
      }
    })
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

}
