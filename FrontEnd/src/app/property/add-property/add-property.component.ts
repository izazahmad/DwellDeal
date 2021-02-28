import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from 'src/app/model/Iproperty';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') addPropertyForm !: NgForm;
  @ViewChild('formTabs') formTabs !: TabsetComponent;

  propertyTypes: Array<string> = ['Flats','Terraced','End-Terrace','Detached','Semi-detached','Cottage','Bungalows']
  furnishTypes: Array<string> = ['Fully','Semi','Unfurnished']
  mainEntrance: Array<string> = ['East','West','South','North']
  bhkSize: Array<number> = [1,2,3,4]

  propertyView: IPropertyBase = {
    Id : null as any,
    Name: '',
    Price: null as any,
    SellRent: null as any,
    PType: null as any,
    FType: null as any,
    BHK: null as any,
    BuiltArea: null as any,
    City: null as any
    //RTM: null as any
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    /*
      //Display value in input fields
      setTimeout(()=> {
      this.addPropertyForm.controls['Name'].setValue('Name');
    }); */
  }
  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    console.log("Submitted form");
    console.log('SellRent=' + this.addPropertyForm.value.BasicInfo.SellRent);
    console.log(this.addPropertyForm);
  }

  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }

}
