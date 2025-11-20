import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  headerOptions: Array<any> = [];

  allOptions: Array<any> = [
    { name: 'Buying', route: 'buying', isBuyVisible: false },
    { name: 'Selling', route: 'selling', isBuyVisible: false },
    { name: 'Agents', route: 'agents', isBuyVisible: false },
    { name: 'Property Listing', route: 'listing', isBuyVisible: false },
    // { name: "FAQ's", route: 'faq', isBuyVisible: false },
    { name: 'Contact Us', route: 'contact', isBuyVisible: true },
    { name: 'About Us', route: 'about', isBuyVisible: false }
  ]

  constructor(public gS: GlobalService) {
    this.gS.currentRoute.subscribe(route => {
      if (route === 'buying' || route==='selling' || route=='agent-prefrence' || route=='sell&buy') {
        this.gS.isFooterVisible=false;
        // this.headerOptions = this.allOptions.filter(opt => opt.isBuyVisible);
         this.headerOptions = [...this.allOptions];
      } else {
        this.gS.isFooterVisible=true;
        this.headerOptions = [...this.allOptions];
      }
    });
  }
}
