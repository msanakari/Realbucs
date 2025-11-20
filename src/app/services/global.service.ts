import { Injectable, NgZone } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public currentRoute = new BehaviorSubject<string>('');
  isFooterVisible: boolean = true;
  activeRoute: string = '';
  isWebsiteOpen: boolean = false;
  imagePath:string='https://realbucs.com/apiadmin/public/upload/';

  constructor(private router: Router,
    private zone: NgZone,
    private toastr: ToastrService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects || event.url;
        const route = url.split('/').filter(Boolean)[0] || '';
        this.activeRoute = route;
        this.currentRoute.next(route); // update route
      });
  }

  ngOnInit() {
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  navigateWithExtras(route: string, extras: NavigationExtras) {
    this.zone.run(() => {
      this.router.navigate([route], extras);
    })

  }

  navigateWithUrl(route: string) {
    this.router.navigateByUrl(route, { replaceUrl: true });
  }


  getNavigationExtras() {
    return this.router.getCurrentNavigation()?.extras?.state;
  }

  showError(message: string) {
    this.toastr.error( message,'Error');
  }

  showSuccess(message: string) {
    this.toastr.success( message,'Success');
  }
}
