import { Input } from "@angular/core";
import { Component } from "@angular/core";
import { IProperty } from "../iProperty.interface";

@Component({
  selector: 'app-property-card',
  //template: `<h1>I am a Card</h1>`,
  templateUrl: 'property-card.component.html',
  //styles:['h1 {font-weight: normal;}']
  styleUrls: ['property-card.component.css']
})
export class PropertyCardComponent {
  @Input() property !: IProperty;

}
