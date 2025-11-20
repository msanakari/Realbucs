import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {

  @Input() topics: {
    topic: string;
    faqs: { question: string; answer: string,class?:string }[];
  }[] = [];
}
