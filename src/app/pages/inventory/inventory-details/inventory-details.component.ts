import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import swal from 'sweetalert2';
import { InventoryDetailsService } from './inventory-details.service';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.scss']
})
export class InventoryDetailsComponent implements OnInit {


  pageSize = 10;
  pageNumber = 1;

  private url = `${environment.apiBaseUrl}/v1`;
  id: string;
  i: string;
  _id: string;
  inventorys;
  editForm: FormGroup;
  memorygb: '';
  brands: '';
  ram_gb: '';
  memory_gb: '';
  mobile_brands: '';
  ramgb: '';
  status : '';
  quantity : '';
  emi : '';


  constructor(private http: HttpClient, private inventorydetailsservice: InventoryDetailsService, private formBuilder: FormBuilder) { 
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

  inventoryspopAdd() {
    this._id = undefined;
    this.brands = '';
    this.memorygb = '';
    this.ramgb = '';
    this.emi = '';
  }

  addInventorys() {
    let itemobj = {
      
      mobile_brands : this.brands,
      memory_gb : this.memorygb,
      ram_gb: this.ramgb,
      emi_number : this.emi,
      status : '1',
      quantity : '1'
    };
    console.log(itemobj)

    this.inventorydetailsservice.createInventory(itemobj).subscribe(data => {
      console.log(data);
      if ( data['status'] === true) {
        this.inventorys.push(data['data']['data']);
      }
    });
  }

  inventoryspopEdit(item, index) {
    this._id = item.id;
    this.i = index;
    this.memorygb = item.memory_gb;
    this.brands = item.mobile_brands;
    this.ramgb = item.ram_gb;
  }

  editInventorys(_id, i, index) {
    let itemedit = {
      memory_gb: this.memorygb,
      mobile_brands: this.brands,
      ram_gb: this.ramgb,
    }; 
    
    this.inventorydetailsservice.editInventory(this._id, itemedit).subscribe(data => {
      if ( data['status'] ===  true) {
        this.inventorys = data['data'];
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
    this.inventorydetailsservice.getInventory().subscribe(data => {
      if ( data['status'] === true ){
        this.inventorys = data['data'];
      }
    });
  }

  inventorysDelete(id, index) {
    this.inventorydetailsservice.deleteInventory(id).subscribe(data => {
      if (data['status'] === true) {
        this.inventorys.splice(index, 1);
      }
    });
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }
}
