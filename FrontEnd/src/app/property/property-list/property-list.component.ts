//import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DwellingService } from 'src/app/services/dwelling.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  //properties: Array<any> = [];
  properties: any;
  constructor(private dwellingService: DwellingService) { }

  ngOnInit(): void {
    this.dwellingService.getAllProperties().subscribe(
      data=>{
             this.properties=data;
             console.log(data)
           }, error => {
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
