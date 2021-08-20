import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { Contact } from './../models/contact';
import { Login } from './../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logins:Login[] = [] 

  constructor(private router: Router,private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

  login(username:string,password:string){
    let data:Login = new Login()
    data.username = username
    data.password = password

    this.httpClient.post("http://localhost:3000/users/login",data).subscribe(res => {
      console.log(res)
      this.logins.push(data)
      localStorage.setItem('token',res.token)
      this.router.navigateByUrl(`/contact/${res.userID}`)
    },err => {
      console.log('iam in err')
      alert('ops! username or password wrong')
    })
  }

  signup(username:string,password:string){
    let data:Login = new Login()
    data.username = username
    data.password = password
    
    this.httpClient.post("http://localhost:3000/users/signup",data).subscribe(res => {
      console.log(res)
      this.logins.push(data)
      alert('you sign up succesfully ,Now login please')
    },err => {
      console.log('iam in err')
      alert('Existing User')
    })
  }
}
