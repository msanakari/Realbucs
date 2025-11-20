import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BuyFlowComponent } from './pages/buy-flow/buy-flow.component';
import { SellFlowComponent } from './pages/sell-flow/sell-flow.component';
import { AgentComponent } from './pages/agent/agent.component';
import { AgentPrefrencesComponent } from './pages/agent-prefrences/agent-prefrences.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { AboutComponent } from './pages/about/about.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SellBuyComponent } from './pages/sell-buy/sell-buy.component';
import { PropertyListingComponent } from './pages/property-listing/property-listing.component';
import { PropertyDetailsComponent } from './pages/property-details/property-details.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'buying',component:BuyFlowComponent},
    {path:'selling',component:SellFlowComponent},
    {path:'agents',component:AgentComponent},
    {path:'agent-prefrence',component:AgentPrefrencesComponent},
    {path:'faq',component:FaqsComponent},
    {path:'about',component:AboutComponent},
    {path:'privacy',component:PrivacyComponent},
    {path:'terms',component:TermsComponent},
    {path:'contact',component:ContactComponent},
    {path:'sell&buy',component:SellBuyComponent},
    {path:'listing',component:PropertyListingComponent},
     {path:'details/:id',component:PropertyDetailsComponent}
];
