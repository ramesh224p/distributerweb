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
  inventorys: string[] ;
  editForm: FormGroup;
  memorygb: '';
  brands: '';
  ram_GB: '';
  quantitys: '';
  memory_GB;
  brand: '';
  ramgb: '';
  quantity: '';


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
    this.quantitys = '';
    console.log('empAdd');
  }

  addinventorys() {
    let itemobj = {
      
      brand : this.brands,
      memory_GB : this.memorygb,
      ram_GB: this.ramgb,
      quantity: this.quantitys
    };

    console.log(itemobj);

    this.inventorydetailsservice.createInventory(itemobj).subscribe(data => {
      console.log(data);
      if ( data['status'] === true) {
        this.inventorys.push(data['data']['data']);
        console.log(this.inventorys);
      }
    });
  }

  inventoryspopEdit(item, index) {
    this._id = item.id;
    this.i = index;
    console.log(index);
    console.log(item['id']);
    this.memorygb = item.memory_GB;
    this.brands = item.brand;
    this.ramgb = item.ram_GB;
    this.quantitys = item.quantity;
  }

  editinventorys(_id, i) {
    console.log(this._id, this.i);
    let itemedit = {
      memory_GB: this.memorygb,
      brand: this.brands,
      ram_GB: this.ramgb,
      quantity: this.quantitys
    };
    
    console.log(itemedit);
    this.inventorydetailsservice.editInventory(this._id, itemedit).subscribe(data => {
      if ( data['status'] ===  true) {
        console.log(data['data']['data']);
        console.log(this.i);
        // this.inventorys.push(data['data']['data'] );
        console.log(this.inventorys);
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
      this.inventorys = data['data'];
      console.log(this.inventorys);
    });
  }

  inventorysDelete(id, index) {
    console.log(id, index);
    this.inventorydetailsservice.deleteInventory(id).subscribe(data => {
      console.log(this.inventorys, data);
      if (data['status'] === true) {
        this.inventorys.splice(index, 1);
        console.log(this.inventorys);
      }
    });
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }


}
