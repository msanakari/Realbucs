import { Component } from '@angular/core';
import { FaqComponent } from '../../common/faq/faq.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faqs',
  imports: [FaqComponent, CommonModule],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss'
})
export class FaqsComponent {

  faqData = [
    {
      topic: 'General',
      faqs: [
        { question: 'What is RealBucs?', answer: "Realbucs was founded with one mission: to make buying and selling real estate simpler, smarter, and more affordable.<br><br>We provide free educational resources including expert insights, in-depth guides, and unbiased reviews to help you navigate every step of your real estate journey with confidence.<br><br>In addition, Realbucs connects buyers and sellers with top-rated, vetted local agents and service providers. We negotiate reduced commission rates and exclusive partner discounts on your behalf, helping you save more.<br><br>Getting started is easy and completely free. Sign up online to discover the agents and savings available in your area. Our process begins with a no-obligation consultation with a Realbucs Advisor, who will learn about your goals and recommend the best path forward." },
        { question: "How our Cashback program works?", answer: "Our cashback program rewards buyers based on the type of property, number of showings, and the amount of time the realtor spends assisting the buyer\n\n<strong>🏡 New Construction Homes</strong>\n\n90% Cashback: Buyer signs for more than 2 homes with the same builder\n\n 85% Cashback: Buyer signs for 2 homes with the builder (New)\n\n80% Cashback: Buyer signs for 1 home with the builder (New)\n\n<strong>🏠 Pre-Owned Homes</strong>\n\n75% Cashback: Buyer views up to 5 homes or minimal realtor time required\n\n70% Cashback: Buyer views up to 10 homes or moderate realtor time required\n\n65% Cashback: Buyer views up to 20 homes or significant realtor time required\n\n50% Cashback: Buyer views unlimited homes or extensive realtor time involvement" },

        { question: 'Why Should I Use RealBucs to Find an Agent?', answer: "We match you with top-performing, pre-vetted local agents based on your specific needs whether you're buying, selling, or both.<br><br>Unlike traditional services, RealBucs works on your behalf to secure lower commissions, exclusive perks, and expert support at every step. You get personalized guidance, access to elite agents, and zero pressure to commit.<br><br>It's fast, free, and risk-free—because you deserve better than random online searches or outdated referrals." },
        { question: "Is RealBucs available in my area?", answer: "Yes! RealBucs is available in all 50 U.S. states and Washington, D.C.<br><br>We work with a nationwide network of top-rated, vetted real estate agents and service providers. No matter where you're buying or selling, we can match you with trusted local professionals and help you access exclusive savings.<br><br>To get started, simply enter your ZIP code and we’ll show you what options and partner agents are available in your area at no cost or obligation." }
      ]
    },
    {
      topic: 'Home sellers',
      faqs: [
        { question: 'How much will I save by selling with RealBucs?', answer: "When you sell with a RealBucs Partner Agent, you typically pay less than or equal to 1% in listing commission instead of the traditional 3%. That means on a $400,000 home, you could save $8,000 or more in commission fees.<br><br>RealBucs negotiates lower rates with top-performing, full-service agents across the country so you get expert support and great results, without overpaying.<br><br>Same great agents. Lower fees. Real savings." },
        { question: "Why do I cover the buyer's agent commission?", answer: "In most real estate transactions, the seller typically pays the buyer's agent commission usually around 2.5% to 3% of the sale price. This has been the industry standard for decades and helps attract more buyers to your listing.<br><br>Offering a competitive buyer's agent commission incentivizes agents to show your property to their clients, which can lead to more offers and a faster sale at a better price.<br><br>With RealBucs, you still save thousands by paying a reduced less than or equal to 1% listing fee to your own agent while remaining competitive by offering a typical buyer's agent commission.<br><br>You get full-service support, national exposure, and more money in your pocket." },
        { question: "Can RealBucs help me get cash offers for my home?", answer: "Yes! RealBucs can connect you with qualified cash buyers and investors in your area.<br><br> If you're looking for a fast, hassle-free sale without showings, repairs, or uncertainty, a cash offer might be the right fit.<br><br>Through our network of trusted buyers and investor partners, RealBucs helps you compare cash offers alongside traditional listings so you can choose the option that works best for your goals and timeline.<br><br>No pressure. No obligation. Just real options to help you sell smarter." }
      ]
    },
    {
      topic: 'Home buyers',
      faqs: [
        { question: 'Can RealBucs help me sell and buy at the same time?', answer: "Yes — RealBucs is built to support clients who are both selling and buying.<br><br>We'll match you with a top-rated local agent experienced in handling dual transactions. Whether you're upsizing, downsizing, or relocating, your agent will help coordinate both timelines so everything aligns as smoothly as possible.<br><br>One trusted agent. Two seamless transactions. Real savings." },
        { question: "Can RealBucs help me find a mortgage lender?", answer: "Yes! Realbucs connects you with trusted, vetted mortgage lenders in your area. Whether you're a first-time buyer or refinancing, our partners offer competitive rates and personalized service to help you secure the best financing for your needs.<br><br>By working with Realbucs-recommended lenders, you gain access to exclusive offers and a smoother mortgage process—so you can focus on finding your dream home." }
      ]
    }
  ];
}
