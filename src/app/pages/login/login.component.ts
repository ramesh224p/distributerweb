import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  private url = `${environment.apiBaseUrl}/v1`;
  emailId:string='';
  passwordIs:string='';
  emails;
  email;
  password;
  passwords;
  user;
  public emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
  loginForm: FormGroup;

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      passwordIs: new FormControl('', Validators.required),
      emailId: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
        Validators.maxLength(20),
      ]),
    });
   }

  ngOnInit() {
    
  } 

  login() {
    let log = {
      email: this.emails,
      password: this.passwords
    };
    console.log(log);
    this.http.post(`${this.url}/login/`, log).subscribe(data => {
      console.log(data);
      if (data['status'] === true) {
        localStorage.setItem('userData', JSON.stringify(data['val']));
        this.router.navigate(['/pages/index']);
      }
    });
  }

}
