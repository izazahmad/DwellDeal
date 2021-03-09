//import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProperty } from 'src/app/model/Iproperty';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { DwellingService } from 'src/app/services/dwelling.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  //properties: Array<IProperty> = [];
  //properties: any;
  SellRent=1;
  properties: IPropertyBase[] | undefined;
  Today= new Date();


  constructor(private route: ActivatedRoute, private dwellingService: DwellingService) { }

  ngOnInit(): void {
    if(this.route.snapshot.url.toString()) {
      this.SellRent=2;
    }
    this.dwellingService.getAllProperties(this.SellRent).subscribe(
      data=>{
             this.properties=data;
             /* const newProperty = JSON.parse(localStorage.getItem('newProp') || '{}');
             if(newProperty.SellRent == this.SellRent) {
               this.properties=[newProperty, ...this.properties];
             } */
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
