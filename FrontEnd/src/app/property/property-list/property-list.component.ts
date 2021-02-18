//import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DwellingService } from 'src/app/services/dwelling.service';
import { IProperty } from '../iProperty.interface';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  //properties: Array<IProperty> = [];
  //properties: any;
  SellRent=1;
  properties: IProperty[] = [];
  constructor(private route: ActivatedRoute, private dwellingService: DwellingService) { }

  ngOnInit(): void {
    if(this.route.snapshot.url.toString()) {
      this.SellRent=2;
    }
    this.dwellingService.getAllProperties(this.SellRent).subscribe(
      data=>{
             this.properties=data;
             console.log(data);
           }, error => {
             console.log('httperror:');
             console.log(error);
           }
    );
    // this.http.get('data/properties.json').subscribe(
    //   data=>{
    //     this.properties=data;
    //     console.log(data)
    //   }
    // );
  }

}
