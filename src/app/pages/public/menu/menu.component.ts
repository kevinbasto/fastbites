import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  toggle: boolean = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  goToLogin() {
    this.router.navigate(['/auth/login'])
  }

  
  toggleSidebar(){
    this.toggle = !this.toggle;
  }

  close(){
    this.toggle = false;
  }


}
