import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { GlobalService } from './services/global.service';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,FooterComponent,CommonModule,NgxUiLoaderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RealBucs';

  constructor(public gS:GlobalService,private loader: NgxUiLoaderService){

  }

  ngOnInit() {
  // this.loader.start();
  // setTimeout(() => this.loader.stop(), 200000);
}
}
