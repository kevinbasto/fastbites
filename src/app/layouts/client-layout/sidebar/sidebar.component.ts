import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationMenuItem } from '../../../core/entities/Navigation-menu-item';
import { NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavigationMenu } from '../../../../environments/menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public routes: Array<NavigationMenuItem> = NavigationMenu;
  public currentRoute! : string;
  @Output() public toggle : EventEmitter<boolean> = new EventEmitter<boolean>();
  public hideSidebar! : boolean;
  private mode : "side" | "over" = "side";

  constructor(
    private router: Router,
    public breakpoint : BreakpointObserver,
  ) {
    
  }

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
    this.currentRoute = this.router.url.split("/")[this.router.url.split("/").length - 1]
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd)
        this.currentRoute = this.router.url.split("/")[this.router.url.split("/").length - 1]
    })
  }


  toggleMenu(){
    if(this.mode == "over")
      this.toggle.emit(true);
  }

  logout(){
    // this.authServ.signOut()
  }

}
