import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-why-work',
  imports: [CommonModule],
  templateUrl: './why-work.component.html',
  styleUrl: './why-work.component.scss'
})
export class WhyWorkComponent {

  selectedSegment: string = 'Sell';

  segment: Array<any> = [
    { name: 'Sell' },
    { name: 'Buy' },
    { name: 'Sell & Buy' }
  ]

  changeSegment(name: string) {
    this.selectedSegment = name;
  }
}
