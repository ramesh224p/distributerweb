import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import swal from 'sweetalert2';

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
  employees: string[] ;
  employee: string[];
  employeesData: Array<any>;
  editForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { 
    this.formEdit();
	
  }

  formEdit(){
    this.editForm = this.formBuilder.group({
      emp_first_name: ['', Validators.required],
      emp_last_name: ['', Validators.required],
      emp_email: ['', Validators.required],
      age: ['', Validators.required],
      emp_address: ['', Validators.required],
      password: ['', Validators.required],
      emp_number: ['', Validators.required]
    });
  }

  editemp(employee, item){
    console.log(this.employee, item);
    // this.http.get(`${this.url}/employees/`+item.id).subscribe(data => {
    //   this.employee = data['data'];
    //   console.log(this.employee);
    // })
  }

  // onSubmit(item, data){
  //   this.http.put(`${this.url}/employees/`+item,data).subscribe(data => {
  //     this.employee = data['data'];
  //     console.log(this.employee);
  //   })
  // }

  ngOnInit() {
    this.loadData();
  }

  openModal(modal) {
    modal.open();
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
    this.http.get(`${this.url}/employees`).subscribe(data => {
      this.employees = data['data'];
      console.log(this.employees);
    })
   
  }

  employeesdelete(id, index){
    this.http.delete(`${this.url}/employees/`+id).subscribe(data => {
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
