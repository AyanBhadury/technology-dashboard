import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logo:string;
  title: string;
  constructor() {
    this.logo = "T";
    this.title = "Technology Dashboard";
   }

  ngOnInit() {
  }

}
