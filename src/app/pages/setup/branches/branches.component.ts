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
  landline_number: '';


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
  }

  addBranch() {
    let itemobj = {      
      branch_code : this.branchcode,
      branch_name : this.branchname,
      address: this.address,
      landline_number: this.number
    };
    this.branchesservice.createBranch(itemobj).subscribe(data => {
      if (data['status'] === true) {
        this.branches.push(data['data']['data']);
      }
    });
  }

  branchpopEdit(item, index) {
    this._id = item.id;
    this.i = index;
    this.branchname = item.branch_name;
    this.branchcode = item.branch_code;
    this.address = item.address;
    this.number = item.landline_number;
  }

  editBranch(_id, i) {
    let itemedit = {
      branch_name: this.branchname,
      branch_code: this.branchcode,
      address: this.address,
      landline_number: this.number
    };
    this.branchesservice.editBranch(this._id, itemedit).subscribe(data => {
      if (data['status'] === true) {
        this.branches = data['data'];
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
    });
  }

  branchDelete(id, index) {
    this.branchesservice.deleteBranch(id).subscribe(data => {
      if (data['status'] === true) {
        this.branches.splice(index, 1);
      }
    });
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

}
