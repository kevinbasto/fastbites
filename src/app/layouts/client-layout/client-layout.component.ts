import { BreakpointObserver } from "@angular/cdk/layout";
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.scss'
})
export class ClientLayoutComponent implements AfterViewInit, OnInit {
  
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  toggle : boolean;
  opened! : boolean;
  showShadow : boolean = true;

  constructor(
    private breakpoint : BreakpointObserver
  ) {
    this.toggle = true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.breakpoint.observe(['(max-width: 1200px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
          this.showShadow = false;
          this.sidenav.position = "end";
        } else {
          this.sidenav.mode = "side"
          this.sidenav.position = "start"
          this.sidenav.open();
          this.showShadow = true;
        }
      })
    }, 0);
  }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.toggle = !this.toggle;
  }

  close(){
    this.toggle = false;
  }

}
