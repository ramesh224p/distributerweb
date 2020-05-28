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
  Ram_GB: '';
  quantitys: '';
  Memory_GB;
  branch: '';
  ramgb: '';
  Quantity: '';


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
    this.quantitys = '';
    console.log('empAdd');
  }

  addIndent() {
    let itemobj = {
      
      branch : this.branchid,
      Memory_GB : this.memorygb,
      Ram_GB: this.ramgb,
      Quantity: this.quantitys
    };

    console.log(itemobj);

    this.indentservice.createIndent(itemobj).subscribe(data => {
      console.log(data);
      if ( data['status'] === true) {
        this.indent.push(data['data']['data']);
        console.log(this.indent);
      }
    });
  }

  indentpopEdit(item, index) {
    this._id = item.id;
    this.i = index;
    console.log(index);
    console.log(item['id']);
    this.memorygb = item.Memory_GB;
    this.branchid = item.branch;
    this.ramgb = item.Ram_GB;
    this.quantitys = item.Quantity;
  }

  editIndent(_id, i) {
    console.log(this._id, this.i);
    let itemedit = {
      Memory_GB: this.memorygb,
      branch: this.branchid,
      Ram_GB: this.ramgb,
      Quantity: this.quantitys
    };
    
    console.log(itemedit);
    this.indentservice.editIndent(this._id, itemedit).subscribe(data => {
      if ( data['status'] === true) {
        console.log(data['data']['data']);
        console.log(this.i);
        // this.indent.push(data['data']['data'] );
        console.log(this.indent);
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
      console.log(this.indent);
    });
  }

  indentDelete(id, index) {
    console.log(id, index);
    this.indentservice.deleteIndent(id).subscribe(data => {
      console.log(this.indent, data);
      if (data['status'] === true) {
        this.indent.splice(index, 1);
        console.log(this.indent);
      }
    });
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

}
