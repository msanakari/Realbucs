import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FaqComponent } from '../../common/faq/faq.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CommonModule } from '@angular/common';
import { VerifyOtpComponent } from '../../modals/verify-otp/verify-otp.component';
import { GlobalService } from '../../services/global.service';
import { AGENT_FORM } from '../../payload-model';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-agent',
  imports: [FaqComponent, NgxIntlTelInputModule, CommonModule, FormsModule, ReactiveFormsModule, VerifyOtpComponent],
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.scss'
})
export class AgentComponent {

  @ViewChild('badgeContainer') badgeContainer!: ElementRef;

  faqData = [
    {
      topic: '',
      faqs: [
        { question: 'Is Signing Up for RealBucs Free?', answer: "There’s no cost to join RealBucs. We receive a referral fee only when you successfully help a client buy or sell a home." },
        { question: 'Can I Pay for Priority Access to Leads?', answer: "No, we don't offer paid lead prioritization. <br><br>Our goal is to connect buyers and sellers with the most qualified agents. The best way to earn more leads is by delivering exceptional service and earning strong client reviews." },
        { question: "How RealBucs Helps You Buy or Sell Smarter?", answer: "1. Submit a request online - It takes less than 2 minutes.<br> 2. Speak with a RealBucs Coordinator - We'll briefly discuss your goals, preferences, and timeline.<br> 3. Receive personalized agent proposals.<br> 4. Compare and review - Evaluate each proposal online and decide which agents you'd like to interview.<br> 5. Hire your agent and get started - Choose the right fit and move forward with confidence.<br><br>There's no cost and no obligation — if you're not 100% satisfied, you can walk away at any time.You have nothing to lose and everything to gain.", class: 'increase_line_height' }
      ]
    }
  ];

  contactForm: FormGroup;

  USStates = [
    { name: 'Alabama', isSelected: false },
    { name: 'Alaska', isSelected: false },
    { name: 'Arizona', isSelected: false },
    { name: 'Arkansas', isSelected: false },
    { name: 'California', isSelected: false },
    { name: 'Colorado', isSelected: false },
    { name: 'Connecticut', isSelected: false },
    { name: 'Delaware', isSelected: false },
    { name: 'Florida', isSelected: false },
    { name: 'Georgia', isSelected: false },
    { name: 'Hawaii', isSelected: false },
    { name: 'Idaho', isSelected: false },
    { name: 'Illinois', isSelected: false },
    { name: 'Indiana', isSelected: false },
    { name: 'Iowa', isSelected: false },
    { name: 'Kansas', isSelected: false },
    { name: 'Kentucky', isSelected: false },
    { name: 'Louisiana', isSelected: false },
    { name: 'Maine', isSelected: false },
    { name: 'Maryland', isSelected: false },
    { name: 'Massachusetts', isSelected: false },
    { name: 'Michigan', isSelected: false },
    { name: 'Minnesota', isSelected: false },
    { name: 'Mississippi', isSelected: false },
    { name: 'Missouri', isSelected: false },
    { name: 'Montana', isSelected: false },
    { name: 'Nebraska', isSelected: false },
    { name: 'Nevada', isSelected: false },
    { name: 'New Hampshire', isSelected: false },
    { name: 'New Jersey', isSelected: false },
    { name: 'New Mexico', isSelected: false },
    { name: 'New York', isSelected: false },
    { name: 'North Carolina', isSelected: false },
    { name: 'North Dakota', isSelected: false },
    { name: 'Ohio', isSelected: false },
    { name: 'Oklahoma', isSelected: false },
    { name: 'Oregon', isSelected: false },
    { name: 'Pennsylvania', isSelected: false },
    { name: 'Rhode Island', isSelected: false },
    { name: 'South Carolina', isSelected: false },
    { name: 'South Dakota', isSelected: false },
    { name: 'Tennessee', isSelected: false },
    { name: 'Texas', isSelected: false },
    { name: 'Utah', isSelected: false },
    { name: 'Vermont', isSelected: false },
    { name: 'Virginia', isSelected: false },
    { name: 'Washington', isSelected: false },
    { name: 'West Virginia', isSelected: false },
    { name: 'Wisconsin', isSelected: false },
    { name: 'Wyoming', isSelected: false }
  ];

  visibleStates: string[] = [];
  hiddenCount: number = 0;

  openOtpModal: boolean = false;

  bgImage = '/assets/home/bg_new_agent.jpg';


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.handleResize();
  }

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, public gS: GlobalService, private http: HttpService) {
    this.contactForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      agentId: ['', Validators.required],
      brokerageCompany: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      countryCode: ['', Validators.required],
      experience: ['', Validators.required],
      states: ['', Validators.required],
    })
  }

  ngAfterViewInit(): void {
    this.calculateVisibleBadges();
  }

  selectState(item: any) {
    item.isSelected = !item?.isSelected;
  }

  get selectedStates(): string[] {
    return this.USStates.filter(s => s.isSelected).map(s => s.name);
  }

  removeState(stateName: string) {
    const state = this.USStates.find(s => s.name === stateName);
    if (state) state.isSelected = false;
    this.calculateVisibleBadges();
  }

  calculateVisibleBadges(): void {
    const container = this.badgeContainer?.nativeElement;
    if (!container) return;

    const testDiv = document.createElement('div');
    testDiv.style.position = 'absolute';
    testDiv.style.visibility = 'hidden';
    testDiv.style.height = 'auto';
    testDiv.style.whiteSpace = 'nowrap';
    testDiv.style.display = 'inline-block';
    testDiv.style.padding = '4px 8px';
    testDiv.style.fontSize = getComputedStyle(container).fontSize;

    document.body.appendChild(testDiv);

    const maxWidth = container.clientWidth - 90;
    let totalWidth = 0;
    const visible: string[] = [];

    for (const state of this.selectedStates) {
      testDiv.textContent = state;
      const width = testDiv.offsetWidth + 25 + 4 * (this.visibleStates.length); // account for close icon & padding

      if (totalWidth + width < maxWidth) {
        console.log(state + testDiv.offsetWidth + (totalWidth + width) + 'abc' + (maxWidth - 90
          - 4 * (this.visibleStates.length)));

        visible.push(state);
        totalWidth += width;
      } else {
        // break;
      }
    }

    document.body.removeChild(testDiv);
    this.visibleStates = visible;
    this.hiddenCount = this.selectedStates.length - visible.length;

    this.cdr.detectChanges();

    const csv = this.selectedStates.join(',');
    this.contactForm.get('states')?.setValue(csv);
  }

  ngDoCheck() {
    this.calculateVisibleBadges();
  }

  handleResize() {
    console.log('Window resized');
  }

  handelOtpVerify() {
    this.openOtpModal = false;
    this.gS.navigateWithExtras('/agent-prefrence', {
      state: {
        formId: this.contactForm.get('id')?.value,
      }
    });
  }

  closeOtpModal() {
    this.openOtpModal = false;
    this.gS.navigate('');
  }

  submitAgentForm() {

    if (this.contactForm.valid) {

      const data: AGENT_FORM = {
        id: this.contactForm.get('id')?.value || null,
        agentId: this.contactForm.value.agentId,
        brokerageCompany: this.contactForm.value.brokerageCompany,
        experience: this.contactForm.value.experience,
        states: this.contactForm.value.states,
        firstName: this.contactForm.value.firstName,
        lastName: this.contactForm.value.lastName,
        email: this.contactForm.value.email,
        countryCode: this.contactForm.value.countryCode,
        phoneNumber: this.contactForm.value.phoneNumber
      };

      this.http.submitAgentForm(data).then((res: any) => {
        if (res?.status === 'success') {
          this.contactForm.patchValue({
            id: res?.data?.id
          });
          setTimeout(() => {
            this.openOtpModal = true;
          }, 100);
        }
      })
    }

  }

  changeEmail() {
    this.openOtpModal = false;
  }

  onPhoneChange() {
    const phoneData = this.contactForm.get('number')?.value;

    if (phoneData && phoneData.e164Number && phoneData.dialCode) {
      const dialCode = phoneData.dialCode;
      const e164Number = phoneData.e164Number;

      const number = e164Number.replace(dialCode, '');

      this.contactForm.patchValue({
        phoneNumber: number,
        countryCode: dialCode
      });
    }
  }

  scrollToDetail(element: HTMLElement) {
    const offset = 80;
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }
}
