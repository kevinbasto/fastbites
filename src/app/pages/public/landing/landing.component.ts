import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  toggle: boolean = false;

  constructor(
    private router: Router
  ) {}

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
