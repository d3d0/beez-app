import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})

export class LoginComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  	      console.log('hello from login Component');
  }
}