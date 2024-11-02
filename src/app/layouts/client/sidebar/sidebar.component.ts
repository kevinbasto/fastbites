import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  public routes: Array<any> = [];
  public currentRoute?: string;
  @Output() public toggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  public hideSidebar?: boolean;
  private mode: "side" | "over" = "side";

  constructor(
    private router: Router,
    public breakpoint: BreakpointObserver
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.breakpoint.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches) {
          this.hideSidebar = false;
          this.mode = "over"
        } else {
          this.hideSidebar = true;
          this.mode = "side";
        }
      })
    }, 0);
  }

  ngOnInit(): void {
    
  }


  toggleMenu() {
    if (this.mode == "over")
      this.toggle.emit(true);
  }

  logout() {
    window.localStorage.removeItem("modules");
    this.router.navigate(['auth/login'])
  }
}

