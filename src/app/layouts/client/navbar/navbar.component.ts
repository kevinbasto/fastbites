import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public hide : boolean = true;
  @Output() toggle : EventEmitter<boolean> = new EventEmitter<boolean>();
  public route? : string;
  public breadcrumbs: Array<{ label: string, url: string }> = []; // Nueva propiedad para los breadcrumbs
  menu: Array<any> = []

  constructor(
    private breakpoint : BreakpointObserver,
    private router : Router
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.breakpoint.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches) {
          this.hide = false;
        } else {
          this.hide = true;
        }
      })
    }, 0);
  }

  ngOnInit(): void {
    let subRoute = this.router.url.split("/")
    this.menu.forEach(element => { if(element.url == subRoute[2]) this.route = element.name });
    this.trackNavigation();
    this.buildBreadcrumbs();
  }

  trackNavigation(){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        let subRoute = this.router.url.split("/");
        this.menu.forEach(element => {if(element.url == subRoute[2]) this.route = element.name});
        this.buildBreadcrumbs();
      }
    });
  }

  toggleSidebar(){
    this.toggle.emit(true);
  }

  buildBreadcrumbs(): void {
    const urlSegments = this.router.url.split('/').filter(segment => segment);
    this.breadcrumbs = urlSegments.map((segment, index) => {
      const url = '/' + urlSegments.slice(0, index + 1).join('/');
      const menuItem = this.menu.find(item => item.url === segment);
      return { label: menuItem ? menuItem.name : segment, url: url };
    });
  }
}
