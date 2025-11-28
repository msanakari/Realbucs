import { animate, group, keyframes, query, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { WhyWorkComponent } from '../why-work/why-work.component';
import { FaqComponent } from '../../common/faq/faq.component';
import { GlobalService } from '../../services/global.service';
import { CashbackOfferModalComponent } from '../../modals/cashback-offer-modal/cashback-offer-modal.component';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, SliderComponent, WhyWorkComponent, FaqComponent,CashbackOfferModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('fadeBounce', [
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      state('hidden', style({ opacity: 0, transform: 'translateY(-20px)' })),
      transition('hidden => visible', [
        animate('300ms ease-out',
          keyframes([
            style({ opacity: 0, transform: 'translateY(-20px)', offset: 0 }),
            style({ opacity: 1, transform: 'translateY(10px)', offset: 0.7 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ])
        )
      ]),
      transition('visible => hidden', [
        animate('100ms ease-in', style({ opacity: 0 }))
      ]),
    ])
  ]
})
export class HomeComponent {
  fadeState: 'visible' | 'hidden' = 'visible';
  segment: Array<any> = [
    {
      name: 'Sell',
      selected: true,
      title: [
        'Match with top-performing property agents.',
        'Save big on commission fees.'
      ],
      subTitle: [
        'List your home with a top-performing agent at the lowest commission in the market.',
        'RealBucs connects you for free, no commitment required.'
      ]
    },
    {
      name: 'Buy',
      selected: false,
      title: [
        'Buy the home you love.',
        'Enjoy RealBucs Cash back once the deal is done.'
      ],
      subTitle: [
        "Get connected to top agents nationwide."
      ]
    },
    {
      name: 'Sell & Buy',
      selected: false,
      title: [
        'Buy and sell with top local agents.',
        'Save thousands on commission and get Cash back once the deal is done.'
      ],
      subTitle: [
        'List your home with a top-performing agent at the lowest commission in the market.',
        'Get connected to top agents nationwide.'
      ]
    }
  ]

  selectedSegment = this.segment[0];

  faqData = [
    {
      topic: '',
      faqs: [
        { question: 'Is RealBucs really free?', answer: "Yes! RealBucs's service is 100% free. When you sell with RealBucs, you will only pay the agreed commission when your home actually sells. If you're buying, you won't pay a dime." },
        { question: 'Why do agents work with RealBucs and offer discounts and cash back?', answer: "We know you're excited to get teamed up with a top agent — and rest assured, our agents are just as excited to be working with you.<br><br>RealBucs works with several experienced agents across the nation from major brands and top regional brokerages. We provide our partners with a steady stream of new business so they can focus their attention on doing what they do best: Selling and buying homes.<br><br>Because we help them save on the typical cost of finding new clients, they're able to pass those savings along to you in the form of a reduced listing fee or home buyer rebate." },
        { question: "Is RealBucs's service available in my area?", answer: "Yes! RealBuc's service is available in all 50 U.S. states and Washington, D.C. We partner with thousands of top-rated real estate agents nationwide to help you save thousands when buying or selling a home.<br><br>Get in touch to learn more and get started! Submit your info via the link below and we'll help you set up a preliminary consultation with a top-performing agent in your area. Remember, the referral is 100% free and there's never an obligation to sign or move forward." }
      ]
    }
  ];

  settingData:Array<any>=[];
  cashbackData:any='';
  animatedValue = 0;

  constructor(public gS: GlobalService,private http:HttpService) {

  }

  ngOnInit(){
    this.getSettings();
  }

  changeSegment(item: any) {
    this.fadeState = 'hidden';
    this.segment = this.segment.map(s => ({
      ...s,
      selected: s.name === item.name
    }));

    this.selectedSegment = this.segment.find(s => s.selected);

    setTimeout(() => {
      // Trigger fade-in
      this.fadeState = 'visible';
    }, 100);
  }

  getStarted() {
    switch (this.selectedSegment?.name) {
      case 'Sell': {
        this.gS.navigate('/selling');
        break;
      }

      case 'Buy': {
        this.gS.navigate('/buying');
        break;
      }

      case 'Sell & Buy': {
        this.gS.navigate('/sell&buy');
        break;
      }

    }
  }

  closeCashbackModal(){
    this.gS.isWebsiteOpen = true;
  }

  async getSettings() {
    await this.http.getSettings().then((res: any) => {
      if (res?.status == "success") {
        this.settingData = res?.data;
        if(this.settingData[0]){
          this.cashbackData=this.settingData[0];
          console.log(this.cashbackData,'cashbackData');
          this.startCountAnimation(this.cashbackData?.value);
        }
      }
    })
  }

   startCountAnimation(target: number) {
    const duration = 1000;
    const frameRate = 60;
    const totalFrames = Math.round((duration / 1000) * frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      this.animatedValue = Math.floor(target * progress);

      if (frame === totalFrames) {
        this.animatedValue = target;
        clearInterval(counter);
      }
    }, 1000 / frameRate);
  }

  viewFaq() {
    this.gS.navigate('/faq');
  }
}
