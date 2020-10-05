import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import swal from 'sweetalert2';
import { IndentService } from './indent.service';

@Component({
  selector: 'app-indent',
  templateUrl: './indent.component.html',
  styleUrls: ['./indent.component.scss']
})
export class IndentComponent implements OnInit {

  pageSize = 10;
  pageNumber = 1;

  private url = `${environment.apiBaseUrl}/v1`;
  id: string;
  i: string;
  _id: string;
  indent: string[] ;
  editForm: FormGroup;
  memorygb: '';
  branchid: '';
  branch_id: '';
  ram_gb: '';
  quantitys: '1';
  memory_gb;
  branch: '';
  ramgb: '';
  quantity: '';


  constructor(private http: HttpClient, private indentservice: IndentService, private formBuilder: FormBuilder) { 
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

  indentpopAdd() {
    this._id = undefined;
    this.branchid = '';
    this.memorygb = '';
    this.ramgb = '';
    this.quantitys = '1';
  }

  addIndent() {
    let itemobj = {
      
      branch_id : this.branchid,
      memory_gb : this.memorygb,
      ram_gb: this.ramgb,
      quantity: this.quantitys
    };

    this.indentservice.createIndent(itemobj).subscribe(data => {
      if ( data['status'] === true) {
        this.indent.push(data['data']['data']);
      }
    });
  }

  indentpopEdit(item, index) {
    this._id = item.id;
    this.i = index;
    this.memorygb = item.memory_gb;
    this.branchid = item.branch_id;
    this.ramgb = item.ram_gb;
    this.quantitys = item.quantity;
  }

  editIndent(_id, i) {
    let itemedit = {
      memory_gb: this.memorygb,
      branch_id: this.branchid,
      ram_gb: this.ramgb,
      quantity: this.quantitys
    };
    
    this.indentservice.editIndent(this._id, itemedit).subscribe(data => {
      if ( data['status'] === true) {
        // this.indent.push(data['data']['data'] );
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
    this.indentservice.getIndent().subscribe(data => {
      this.indent = data['data'];
    });
  }

  indentDelete(id, index) {
    this.indentservice.deleteIndent(id).subscribe(data => {
      if (data['status'] === true) {
        this.indent.splice(index, 1);
      }
    });
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

}
