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
  complaints: string[] ;
  employee;
  complaint;
  editForm: FormGroup;
  emp_id;
  complaints_;


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
    console.log('empAdd');
  }

  addComp() {
    let itemobj = {
      emp_id : this.employee,
      complaints_ : this.complaint,
    };

    // console.log(itemobj)

    this.complaintservice.createComplaints(itemobj).subscribe(data => {
      console.log(data);
      if ( data['status'] === true) {
        this.complaints.push(data['data']['data']);
        console.log(this.complaints);
      }
    });
  }

  compEdit(item, index) {
    this._id = item.id;
    this.i = index;
    console.log(index);
    console.log(item['id']);
    this.employee = item.emp_id;
    this.complaint = item.complaints_;

  }

  editComp(_id, i) {
    console.log(this._id, this.i);
    let itemedit = {
      emp_id : this.employee,
      complaints_ : this.complaint,
    };
    
    console.log(itemedit);
    this.complaintservice.editComplaints(this._id, itemedit).subscribe(data => {
      if ( data['status'] === true) {
        console.log(data['data']['data']);
        console.log(this.i);
        // this.complaints.push(data['data']['data'] );
        console.log(this.complaints);
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
      this.complaints = data['data'];
      console.log(this.complaints);
    });
  }

  complaintsDelete(id, index) {
    console.log(id, index);
    this.complaintservice.deleteComplaints(id).subscribe(data => {
      console.log(this.complaints, data);
      if (data['status'] === true) {
        this.complaints.splice(index, 1);
        console.log(this.complaints);
      }
    });
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

}
