import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import swal from 'sweetalert2';
import { ComplaintService } from './complaint.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {

  pageSize = 10;
  pageNumber = 1;

  private url = `${environment.apiBaseUrl}/v1`;
  items: string[] ;
  id: string;
  i: string;
  _id: string;
  complaintes: string[] ;
  employee : '';
  complaint: '';
  editForm: FormGroup;
  emp_id: '';
  complaints : '';


  constructor(private http: HttpClient, private complaintservice: ComplaintService, private formBuilder: FormBuilder) { 
    this.formEdit();
  }

  formEdit() {
    this.editForm = this.formBuilder.group({
      complaint: ['', Validators.required],
    });
  }

  get fval() {
    return this.editForm.controls;
  }

  compAdd()  {
    this._id = undefined;
    this.employee = '';
    this.complaint = '';
  }

  addComp() {
    let itemobj = {
      emp_id : this.employee,
      complaints : this.complaint,
    };

    console.log(itemobj);

    this.complaintservice.createComplaints(itemobj).subscribe(data => {
      if ( data['status'] === true) {
        this.complaintes.push(data['data']['data']);
        console.log(data);
      }
      console.log("hi");
    });
  }

  compEdit(item, index) {
    this._id = item.id;
    this.i = index;
    this.employee = item.emp_id;
    this.complaint = item.complaints;

  }

  editComp(_id, i) {
    let itemedit = {
      emp_id : this.employee,
      complaints : this.complaint,
    };
    
    this.complaintservice.editComplaints(this._id, itemedit).subscribe(data => {
      if ( data['status'] === true) {
        console.log(this.closeModal);
        this.complaintservice.getComplaints().subscribe(data => {
          this.complaintes = data['data'];
        })
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
    this.complaintservice.getComplaints().subscribe(data => {
      this.complaintes = data['data'];
    });
  }

  complaintsDelete(id, index) {
    this.complaintservice.deleteComplaints(id).subscribe(data => {
      if (data['status'] === true) {
        this.complaintes.splice(index, 1);
      }
    });
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

}
