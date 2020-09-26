import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-inventory-assignlist',
  templateUrl: './inventory-assignlist.component.html',
  styleUrls: ['./inventory-assignlist.component.scss']
})
export class InventoryAssignlistComponent implements OnInit {

  constructor(private http: HttpClient) { }

  pageSize = 10;
  pageNumber = 1;

  private url = `${environment.apiBaseUrl}/v1`;
  inventoryassign : string[];

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.http.get(`${this.url}/inventory_assign`).subscribe(data => {
      this.inventoryassign = data['data'];
    })
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

}
