import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import swal from 'sweetalert2';
import { FinanceService } from './finance.service';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})
export class FinancesComponent implements OnInit {

  pageSize = 10;
  pageNumber = 1;

  private url = `${environment.apiBaseUrl}/v1`;
  items: string[] ;
  id: string;
  i: string;
  getid: string;
  _id: string;
  finances: string[] ;
  editForm: FormGroup;
  personname: '';
  work: '';
  address: '';
  number: '';
  person_name;
  works: '';
  emails: '';
  age: '';
  eaddress: '';
  password: '';
  mobile_number: '';


  constructor(private http: HttpClient, private financeservice: FinanceService, private formBuilder: FormBuilder) { 
    this.formEdit();
  }

  formEdit() {
    this.editForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      lastName: ['', Validators.required],
      eaddress: ['', Validators.required],
      number: ['', Validators.required]
    });
  }

  get fval() {
    return this.editForm.controls;
  }

  financepopAdd() {
    this._id = undefined;
    this.personname = '';
    this.works = '';
    this.address = '';
    this.number = '';
  }

  addFinance() {
    let itemobj = {
      person_name : this.personname,
      work : this.works,
      address: this.address,
      mobile_number: this.number
    };
    this.financeservice.createFinances(itemobj).subscribe(data => {
      if ( data['status'] === true) {
        this.finances.push(data['data']['data']);
      }
    });
  }

  financepopEdit(item, index) {
    this._id = item.id;
    this.i = index;
    this.personname = item.person_name;
    this.works = item.work;
    this.address = item.address;
    this.number = item.mobile_number;
  }

  editFinance(_id, i) {
    let itemedit = {
      person_name: this.personname,
      work: this.works,
      address: this.address,
      mobile_number: this.number
    };
    this.financeservice.editFinances(this._id, itemedit).subscribe(data => {
      if ( data['status'] === true) {
        this.finances = data['data'];
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
    this.financeservice.getFinances().subscribe(data => {
      this.finances = data['data'];
    });
  }

  financeDelete(id, index) {
    this.financeservice.deleteFinances(id).subscribe(data => {
      if (data['status'] === true) { 
        this.finances.splice(index, 1);
      }
    });
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }


}
