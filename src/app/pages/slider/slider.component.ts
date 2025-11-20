import { Component, Input } from '@angular/core';
import { LabelType, NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  imports: [NgxSliderModule, CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {

  @Input() cardType:string='Sell';

  value: number = 300000;
  options: Options = {
    floor: 130000,
    ceil: 2000000,
    showSelectionBar: true,
    selectionBarGradient: {
      from: '#024FF0',
      to: '#024FF0'
    }
  };

  isMinValue(): boolean {
    return this.value === this.options.floor;
  }

  onValueChange(newValue: number) {
    this.value = newValue;
  }

}
