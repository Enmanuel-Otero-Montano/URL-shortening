import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showMenu:boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  showHideMenu(){
    if(this.showMenu){
      this.showMenu = false
    }else{
      this.showMenu = true
    }
  }

}
