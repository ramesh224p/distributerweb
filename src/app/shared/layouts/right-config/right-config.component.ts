import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'right-config',
  templateUrl: './right-config.component.html',
  styleUrls: ['./right-config.component.scss']
})

export class RightConfigComponent implements OnInit {

  isConfigToggle: boolean = false;
  imageURL: string  = null;
  selectedFile : File = null;
  private url = `${environment.apiBaseUrl}/v1`;

  constructor(private _globalService: GlobalService, private router: Router, private http: HttpClient) { }

  ngOnInit() { }

  configToggle() {
    this.isConfigToggle = !this.isConfigToggle;
    //this._globalService._sidebarToggleState(!this.isConfigToggle);
    this._globalService.dataBusChanged('sidebarToggle', !this.isConfigToggle);
  }

  encodeImageFileAsURL(element) {
    this.selectedFile = <File>element.target.files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      this.imageURL = <string>reader.result;
   }
   reader.readAsDataURL(this.selectedFile);
 }

  upload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    console.log(this.selectedFile.name);
    let dataobj = {
      base64image : this.imageURL,
      imagename : this.selectedFile.name
    }
    this.http.post(`${this.url}/upload`, dataobj).subscribe(
      res => {
        console.log(res);
      })
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
