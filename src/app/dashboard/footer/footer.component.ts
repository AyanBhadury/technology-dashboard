import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footerinfo: string;
  constructor() { 
    this.footerinfo = "All data captured from Github & NPM stats";
  }

  ngOnInit() {
  }

}
