import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Property } from 'src/app/model/property';
import { DwellingService } from 'src/app/services/dwelling.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  public propertyId: number | undefined;
  property = new Property();
  galleryOptions: NgxGalleryOptions[] | undefined;
  galleryImages: NgxGalleryImage[] | undefined;
  constructor(private route:ActivatedRoute,
              private router:Router,
              private housingService: DwellingService
              ) { }

  ngOnInit(): void {
    this.propertyId=Number(this.route.snapshot.params['id']);
    this.route.data.subscribe(
      (data:any) => {
        this.property=data['prp'];
      }
    );
    // this.route.params.subscribe(
    //   (params)=> {
    //     this.propertyId = +params['id'];//+ sign is for converting propertyId in number
    //     this.housingService.getProperty(this.propertyId).subscribe(
    //       (data: Property | undefined)=> {
    //         (this.property as any)= data;
    //       }, error => this.router.navigate(['/'])
    //     );
    //   }
    // );

  /* onSelectNext() {
    this.propertyId +=1;
    this.router.navigate(['property-detail', this.propertyId]);
  } */

  this.galleryOptions = [
    {
      width: '100%',
      height: '465px',
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide
    },
    // max-width 800
    {
      breakpoint: 800,
      width: '100%',
      height: '600px',
      imagePercent: 80,
      thumbnailsPercent: 20,
      thumbnailsMargin: 20,
      thumbnailMargin: 20
    },
    // max-width 400
    {
      breakpoint: 400,
      preview: false
    }
  ];

  this.galleryImages = [
    {
      small: 'assets/images/prop-1.jpg',
      medium: 'assets/images/prop-1.jpg',
      big: 'assets/images/prop-1.jpg'
    },
    {
      small: 'assets/images/prop-2.jpg',
      medium: 'assets/images/prop-2.jpg',
      big: 'assets/images/prop-2.jpg'
    },
    {
      small: 'assets/images/prop-3.jpg',
      medium: 'assets/images/prop-3.jpg',
      big: 'assets/images/prop-3.jpg'
    },{
      small: 'assets/images/prop-4.jpg',
      medium: 'assets/images/prop-4.jpg',
      big: 'assets/images/prop-4.jpg'
    },
    {
      small: 'assets/images/Dwell_Default.png',
      medium: 'assets/images/Dwell_Default.png',
      big: 'assets/images/Dwell_Default.png'
    }
  ];
}


}
