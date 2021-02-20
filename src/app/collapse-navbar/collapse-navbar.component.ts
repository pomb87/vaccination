import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapse-navbar',
  templateUrl: './collapse-navbar.component.html',
  styleUrls: ['./collapse-navbar.component.css']
})
export class CollapseNavbarComponent implements OnInit {

  public isMenuCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

}
