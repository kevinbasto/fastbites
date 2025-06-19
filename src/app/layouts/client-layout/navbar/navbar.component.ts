import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationMenuItem } from '../../../core/generics/Navigation-menu-item';
import { NavigationMenu } from '../../../../environments/navigation-menu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
,
  standalone: false})
export class NavbarComponent implements OnInit, AfterViewInit {
  public hide: boolean = true;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  public route!: string;
  menu: Array<NavigationMenuItem> = NavigationMenu;
  notifications : Array<any> = [];

  constructor(
    private breakpoint: BreakpointObserver,
    private router: Router
  ) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.breakpoint.observe(['(max-width: 1200px)']).subscribe((res) => {
        if (res.matches) {
          this.hide = false;
        } else {
          this.hide = true;
        }
      });
    }, 0);
  }

  ngOnInit(): void {
    let subRoute = this.router.url.split("/")
    this.menu.forEach(element => { if (element.url == subRoute[2]) this.route = element.name });
    this.trackNavigation();
  }

  trackNavigation() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let subRoute = this.router.url.split("/")
        this.menu.forEach(element => { if (element.url == subRoute[2]) this.route = element.name });
      }
    });
  }

  toggleSidebar() {
    this.toggle.emit(true);
  }
}
