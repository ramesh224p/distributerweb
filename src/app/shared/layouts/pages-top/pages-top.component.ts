import {AfterViewInit, Component, Input} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'pages-top',
  templateUrl: './pages-top.component.html',
  styleUrls: ['./pages-top.component.scss'],
})
export class PagesTopComponent implements AfterViewInit {
  avatarImgSrc: string = 'assets/images/avatar.jpg';
  userName: string = 'Ramesh';
  userPost: string = 'FrontEnd';

  private url = `${environment.apiBaseUrl}/v1`;
  employees: [];

  sidebarToggle: boolean = true;
  tip = {ring: true, email: true};

  constructor(private _globalService: GlobalService, private http: HttpClient) {
    this.http.get(`${this.url}/employees`).subscribe(data => {
      // console.log(data);
      this.employees = data['data'];
    });
  }

  private _serachemp: string;
  filteredEmployees;

  get searchemp(): string {
    return this._serachemp;
  }

  set serachemp(val: string)  {
    this._serachemp = val;
    this.filteredEmployees = this.filteredEmployee(val);
  }

  filteredEmployee(searchemps: string) {
    // return this.employees.filter(employee => 
      // employee.emp_first_name.ToLowerCase().indexOf(searchemps.toLowerCase()) !== -1);
  }

  empsearch() {
    console.log( 'hi' );
    

  }

  public _sidebarToggle() {
    /* this._globalService.sidebarToggle$.subscribe(sidebarToggle => {
      this.sidebarToggle = sidebarToggle;
    }, error => {
      console.log('Error: ' + error);
    }); */

    this._globalService.data$.subscribe(data => {
      if (data.ev === 'sidebarToggle') {
        this.sidebarToggle = data.value;
      }
    }, error => {
      console.log('Error: ' + error);
    });
    this._globalService.dataBusChanged('sidebarToggle', !this.sidebarToggle);


    //this._globalService._sidebarToggleState(!this.sidebarToggle);
  }


  ngAfterViewInit(): void {
    this.sidebarToggle = window.innerWidth >= 970;
  }
}
