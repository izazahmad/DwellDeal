import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/services/user-service.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerationForm !: FormGroup;
  user !: User;
  userSubmitted !: boolean;
  constructor(private fb: FormBuilder, private userService: UserServiceService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    //this.registerationForm= new FormGroup({
    //   userName: new FormControl(null, Validators.required),
    //   email: new FormControl(null,[Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   confirmPassword: new FormControl(null, [Validators.required]),
    //   mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)])
    // }, this.passwordMatchingValidator});
    this.createRegisterationForm();
  }

  createRegisterationForm() {
    this.registerationForm=this.fb.group({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)])
    },{validators: this.passwordMatchingValidator});
  }

  passwordMatchingValidator(fg: AbstractControl) {
    //return fg.get('password')?.value===fg.get('confirmPassword')?.value ? null :
   return fg.get('password')?.value === fg.get('confirmPassword')?.value ? null : { passwordNotMatch: true };
  //  const password = fg.get('password');
  //   const confirmPassword = fg.get('confirmPassword');
  //   return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  //Getter method for all form controls
  get userName(){
    return this.registerationForm.get('userName') as FormControl;
  }
  get email(){
    return this.registerationForm.get('email') as FormControl;
  }
  get password(){
    return this.registerationForm.get('password') as FormControl;
  }
  get confirmPassword(){
    return this.registerationForm.get('confirmPassword') as FormControl;
  }
  get mobile(){
    return this.registerationForm.get('mobile') as FormControl;
  }

  onSubmit() {
    console.log(this.registerationForm.value);
    this.userSubmitted=true;
    if(this.registerationForm.valid){
    //this.user=Object.assign(this.user,this.registerationForm.value);
      this.userService.addUser(this.userData());
      this.registerationForm.reset();
      this.userSubmitted=false;
      this.alertify.success("You are Successfully Registered.");
    } else {
      this.alertify.error("Provide required fields.");
    }
  }
  userData(): User {
    return this.user={
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
    }
  }

  // addUser(user: any) {
  //   let users=[];
  //   if(localStorage.getItem('Users')) {
  //     users=JSON.parse(localStorage.getItem('Users') || '{}');
  //     users=[user, ...users];
  //   }
  //   else {
  //     users=[user];
  //   }
  //   localStorage.setItem('Users',JSON.stringify(users));
  // }

}
