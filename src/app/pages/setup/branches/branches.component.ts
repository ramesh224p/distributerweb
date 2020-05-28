import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import swal from 'sweetalert2';
import { BranchesService } from './branches.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

  
  pageSize = 10;
  pageNumber = 1;

  private url = `${environment.apiBaseUrl}/v1`;
  items: string[] ;
  id: string;
  i: string;
  getid: string;
  _id: string;
  branches: string[] ;
  branchesData: Array<any>;
  editForm: FormGroup;
  branchname: '';
  branchcode: '';
  email: '';
  address: '';
  number: '';
  branch_name: '';
  branch_code: '';
  emails: '';
  age: '';
  eaddress: '';
  password: '';
  mobile_number: '';


  constructor(private http: HttpClient, private branchesservice: BranchesService, private formBuilder: FormBuilder) { 
    this.formEdit();
  }

  formEdit() {
    this.editForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      lastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      eaddress: ['', Validators.required],
      number: ['', Validators.required]
    });
  }

  get fval() {
    return this.editForm.controls;
  }

  branchpopAdd() {
    this._id = undefined;
    this.branchname = '';
    this.branchcode = '';
    this.emails = '';
    this.address = '';
    this.number = '';
    console.log('empAdd');
  }

  addBranch() {
    let itemobj = {
      
      branch_code : this.branchcode,
      branch_name : this.branchname,
      address: this.address,
      mobile_number: this.number
    };

    console.log(itemobj);

    this.branchesservice.createBranch(itemobj).subscribe(data => {
      console.log(data);
      if (data['status'] === true) {
        this.branches.push(data['data']['data']);
        console.log(this.branches);
      }
    });
  }

  branchpopEdit(item, index) {
    this._id = item.id;
    this.i = index;
    console.log(index);
    console.log(item['id']);
    this.branchname = item.branch_name;
    this.branchcode = item.branch_code;
    this.address = item.address;
    this.number = item.mobile_number;
  }

  editBranch(_id, i) {
    console.log(this._id, this.i);
    let itemedit = {
      branch_name: this.branchname,
      branch_code: this.branchcode,
      address: this.address,
      mobile_number: this.number
    };
    
    console.log(itemedit);
    this.branchesservice.editBranch(this._id, itemedit).subscribe(data => {
      if (data['status'] === true) {
        console.log(data['data']['data']);
        console.log(this.i);
        // this.branches.push(data['data']['data'] );
        console.log(this.branches);
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
    this.branchesservice.getBranches().subscribe(data => {
      this.branches = data['data'];
      console.log(this.branches);
    });
  }

  branchDelete(id, index) {
    console.log(id, index);
    this.branchesservice.deleteBranch(id).subscribe(data => {
      console.log(this.branches, data);
      if (data['status'] === true) {
        this.branches.splice(index, 1);
        console.log(this.branches);
      }
    });
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

}
