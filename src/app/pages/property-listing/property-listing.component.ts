import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { GET_PROPERTY_LISTING } from '../../payload-model';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-listing',
  imports: [CommonModule],
  templateUrl: './property-listing.component.html',
  styleUrl: './property-listing.component.scss'
})
export class PropertyListingComponent {

  listingData:Array<any>=[];
  constructor(public gS:GlobalService,private http:HttpService){
    this.getData(0, 10);
  }

  getData(pageNo: number = 0, pageSize: number = 10) {
      let payload: GET_PROPERTY_LISTING = {
        pageNo: pageNo,
        pageSize: 1000,
      }
  
      this.http.getPropertyListing(payload).then((res: any) => {
        if (res?.status == 'success' && res?.data) {
          let data = res.data;
          // this.totalPages = data?.total || 0;
          // this.pageData = data?.data || [];
          this.listingData=res?.data?.data || [];
          console.log('Response from getEnquiryData:', this.listingData);
        }
  
      })
    }
}
