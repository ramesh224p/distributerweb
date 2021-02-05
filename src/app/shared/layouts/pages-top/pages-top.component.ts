import { AfterViewInit, Component, Input } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Ng2ImgMaxService } from 'ng2-img-max';
import * as saveAs from 'file-saver';

@Component({
  selector: 'pages-top',
  templateUrl: './pages-top.component.html',
  styleUrls: ['./pages-top.component.scss'],
})
export class PagesTopComponent implements AfterViewInit {
  avatarImgSrc: any ;
  userName: string ;
  thumbnail: any;
  uploadedImage: Blob;
  fs : any;
  imageURL: string  = null;
  dataobj : any;
  objectURL : any;
  selectedFile : File = null;
  userPost: string = 'FrontEnd';

  private url = `${environment.apiBaseUrl}/v1`;
  employees: [];

  sidebarToggle: boolean = true;
  tip = {ring: true, email: true};

  constructor(private _globalService: GlobalService, private http: HttpClient, private sanitizer: DomSanitizer, private ng2ImgMax: Ng2ImgMaxService) {

    if(this.avatarImgSrc == null) {
      this.avatarImgSrc = 'assets/images/avatar.jpg'
    }

    var x = JSON.parse(localStorage.getItem("userData"))['data1']['emp_first_name'];
    this.userName = x;

    this.http.get(`${this.url}/profile`).subscribe(data => {
      this.objectURL = 'data:image/jpeg;base64,' + data['data'];
      this.avatarImgSrc = this.objectURL;
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

  encodeImageFileAsURL(element) {
    this.selectedFile = <File>element.target.files[0];

    this.ng2ImgMax.resizeImage(this.selectedFile, 10000, 1636).subscribe(
      result => {
        this.uploadedImage = result;          
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );

    var reader = new FileReader();
    reader.onloadend = () => {
      this.imageURL = <string>reader.result;
   }
   reader.readAsDataURL(this.selectedFile);
  }

 upload(){
  const fd = new FormData();
  fd.append('image', this.selectedFile, this.selectedFile.name);
  let dataobj = {
    base64image : this.imageURL,
    imagename : this.selectedFile.name
  }
  this.http.post(`${this.url}/profile`, dataobj).subscribe(
    res => {
      if(res['status'] == true){
        this.objectURL = 'data:image/jpeg;base64,' + res['base64'];
        this.avatarImgSrc = this.objectURL;
      } else {
        console.log("input problem");
      }
      
    })
  }

  openModal(modal) {
    modal.open();
  }

  closeModal(modal) {
    modal.close();
  }

  public _sidebarToggle() {

    this._globalService.data$.subscribe(data => {
      if (data.ev === 'sidebarToggle') {
        this.sidebarToggle = data.value;
      }
    }, error => {
      console.log('Error: ' + error);
    });
    this._globalService.dataBusChanged('sidebarToggle', !this.sidebarToggle);
  }


  ngAfterViewInit(): void {
    this.sidebarToggle = window.innerWidth >= 970;
  }
}
