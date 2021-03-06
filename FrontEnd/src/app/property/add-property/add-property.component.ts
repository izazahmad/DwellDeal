import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm,NgModelGroup,Validators,FormControl,AbstractControl,ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from 'src/app/model/Iproperty';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { DwellingService } from 'src/app/services/dwelling.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  //@ViewChild('Form') addPropertyForm !: NgForm;
  @ViewChild('formTabs') formTabs !: TabsetComponent;
  //@ViewChild('Form') addPropertyForm !: FormGroup;
  addPropertyForm !: FormGroup;
  NextClicked !: boolean;
  property= new Property();

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
    City: null as any,
    RTM: null as any
  };

  constructor(private router: Router,
              private fb:FormBuilder,
              private housingService: DwellingService,
              private alertify: AlertifyService
              ) { }

  ngOnInit(): void {
    /*
      //Display value in input fields
      setTimeout(()=> {
      this.addPropertyForm.controls['Name'].setValue('Name');
    }); */
    this.CreateAddPropertyForm();
  }

  CreateAddPropertyForm() {
    this.addPropertyForm=this.fb.group({
      BasicInfo:this.fb.group({
        SellRent:['1',Validators.required],
        PType: [null, Validators.required],
        Name:[null, Validators.required],
        BHK:[null, Validators.required],
        City: [null, Validators.required],
        FType: [null, Validators.required]
      }),

     PriceInfo: this.fb.group({
        Price:[null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea:[null],
        Security: [null],
        Maintenance: [null]
    }),

    AddressInfo: this.fb.group({
      FloorNo: [null],
      TotalFloor: [null],
      Address: [null, Validators.required],
      Landmark: [null]
    }),
    OtherInfo: this.fb.group({
      RTM: [null, Validators.required],
      PossessionOn:[null],
      AOP:[null],
      Gated:[null],
      MainEntrance: [null],
      Description:[null]

    })
    });
  }

  //#region <Getter Methods>
  //#region <FormGroups></FormGroups>
  get BasicInfo() {
    return this.addPropertyForm.controls.BasicInfo as FormGroup;
  }

  get PriceInfo() {
    return this.addPropertyForm.controls.PriceInfo as FormGroup;
  }

  get AddressInfo() {
    return this.addPropertyForm.controls.AddressInfo as FormGroup;
  }

  get OtherInfo() {
    return this.addPropertyForm.controls.OtherInfo as FormGroup;
  }
  //#endregion

  get SellRent() {
    return this.BasicInfo.controls.SellRent as FormControl;
  }
  get BHK() {
    return this.BasicInfo.controls.BHK as FormControl;
  }
  get PType() {
    return this.BasicInfo.controls.PType as FormControl;
  }
  get FType() {
    return this.BasicInfo.controls.FType as FormControl;
  }
  get Name() {
    return this.BasicInfo.controls.Name as FormControl;
  }
  get City() {
    return this.BasicInfo.controls.City as FormControl;
  }
  get Price() {
    return this.PriceInfo.controls.Price as FormControl;
  }
  get Security() {
    return this.PriceInfo.controls.Security as FormControl;
  }
  get Maintenance() {
    return this.PriceInfo.controls.Maintenance as FormControl;
  }
  get BuiltArea() {
    return this.PriceInfo.controls.BuiltArea as FormControl;
  }
  get CarpetArea() {
    return this.PriceInfo.controls.CarpetArea as FormControl;
  }
  get FloorNo() {
    return this.AddressInfo.controls.FloorNo as FormControl;
  }
  get TotalFloor() {
    return this.AddressInfo.controls.TotalFloor as FormControl;
  }
  get Address() {
    return this.AddressInfo.controls.Address as FormControl;
  }
  get Landmark() {
    return this.AddressInfo.controls.Landmark as FormControl;
  }
  get RTM() {
    return this.OtherInfo.controls.RTM as FormControl;
  }
  get AOP() {
    return this.OtherInfo.controls.AOP as FormControl;
  }
  get Gated() {
    return this.OtherInfo.controls.Gated as FormControl;
  }
  get MainEntrance() {
    return this.OtherInfo.controls.MainEntrance as FormControl;
  }
  get PossessionOn() {
    return this.OtherInfo.controls.PossessionOn as FormControl;
  }
  get Description() {
    return this.OtherInfo.controls.Description as FormControl;
  }
  //#endregion
  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.NextClicked=true;

   if (this.tabsValidation()) {
     this.mapProperty();
     this.housingService.addProperty(this.property);
    this.alertify.success("Congrats, Property Listed Successfully");
    //console.log('SellRent=' + this.addPropertyForm?.value.BasicInfo.SellRent);
    console.log(this.addPropertyForm);

    if(this.SellRent.value == '2') {
      this.router.navigate(['/rent-property']);
    } else {
      this.router.navigate(['/']);
    }
  } else {
    this.alertify.error('Please review the form and check validation');
  }
  }

  mapProperty(): void {
    this.property.Id=this.housingService.newPropID();
    this.property.SellRent = +this.SellRent.value;//+ sign is for convert to number
    this.property.BHK = this.BHK.value;
    this.property.PType=this.PType.value;
    this.property.Name= this.Name.value;
    this.property.City= this.City.value;
    this.property.FType=this.FType.value;
    this.property.Price=this.Price.value;
    this.property.Security=this.Security.value;
    this.property.Maintenance= this.Maintenance.value;
    this.property.BuiltArea= this.BuiltArea.value;
    this.property.CarpetArea= this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.Landmark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance= this.MainEntrance.value;
    this.property.Possession=this.PossessionOn.value;
    this.property.Description= this.Description.value;
    this.property.PostedOn = new Date().toString();
  }

  tabsValidation():boolean {
    if(this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active=true;
      return false;
    }

    if(this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active=true;
      return false;
    }

    if(this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active=true;
      return false;
    }
    if(this.OtherInfo.invalid) {
      this.formTabs.tabs[3].active=true;
      return false;
    }
    return true;
  }

  selectTab(tabId: number, IsCurrentTabValid: boolean) {
    this.NextClicked=true;
    if(IsCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }
  }

}
