import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../../../environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-inventory-assign',
  templateUrl: './inventory-assign.component.html',
  styleUrls: ['./inventory-assign.component.scss']
})
export class InventoryAssignComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  private url = `${environment.apiBaseUrl}/v1`;
  public statuss = 1;
  inventory: any;
  status: number;
  saveUsername: boolean;
  tableData = [];
  selectedPhones = [];
  emp_id ;
  assign_emp_id ;
  object = [];
  branchSelect;
  vehicleNum;

  ngOnInit() {
    this.http.get(`${this.url}/inventory?status=` + this.statuss).subscribe(data => {
      this.inventory = data['data'];
    });
  }

  openModal(index, item, modal) {
    console.log(this.tableData);
    modal.open();
  }

  closeModal(modal) {
    modal.close();
  }

  onClose() {
    // swal({
    //   type: 'success',
    //   title: 'Success!',
    //   text: 'close it!',
    // });
  }

  onSaveUsernameChanged(value: boolean) {
      this.saveUsername = value;
  }

  inventoryData(method: string) {
    
  }

  selectedItem(selectedItem: any) {
    if (this.tableData.length === 0) {
      this.tableData.push(selectedItem);
    } else {
      this.tableData.forEach( (item, index) => {
          if (item.id === selectedItem.id) {
            this.tableData.splice(index, 1);
            return ;
          }
          if (this.tableData.length - 1 === index) {
            this.tableData.push(selectedItem);
          }
      });
    }
  }

  selectMobile(modal) {
    this.selectedPhones = this.tableData;
    modal.close();
  }

  phonesSelected() {
    this.emp_id = JSON.parse(localStorage.getItem('userData'))['id'];

    this.tableData.forEach( (element) => {
      console.log(element['id']);
      // console.log(element.split(','));
      let object = {
        assign_emp_id : this.emp_id ,
        inventory_id : element['id'],
        branch_id : this.branchSelect,
        shipped_status : this.status,
        shipped_vehicle_number : this.vehicleNum
      };

      console.log(object);

    this.http.post(`${this.url}/inventory-assign`, object).subscribe(data => {
      console.log(data);
    });

    });
  }
}
