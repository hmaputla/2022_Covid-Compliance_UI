import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';

@Component({
  selector: 'app-registervisitor',
  templateUrl: './registervisitor.component.html',
  styleUrls: ['./registervisitor.component.css']
})
export class RegistervisitorComponent implements OnInit {

  constructor(private customvalidator:CustomvalidationService) { }

  campuses:any[]=['Arcadia','Arts','eMalahleni','Ga-Rankuwa','Mbombela','Polokwane','Pretoria','Soshanguve South','Soshanguve North',];
  visitorRegForm:any;
  hide=true;
  submitted=false;

  ngOnInit(): void
  {
    this.visitorRegForm=new FormGroup
    (
      {
        userId:new FormControl('',[Validators.required,Validators.pattern('^(0|[1-9][0-9]*)$')]),
        firstNames:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]*')]),
        lastName:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]*')]),
      //username:new FormControl('',[Validators.required,Validators.pattern('^(0|[1-9][0-9]*)$')]),
        password:new FormControl('',[Validators.required,Validators.minLength(8),this.customvalidator.patternPassValidator()]),
        confirm_password:new FormControl('',[Validators.required]),
        email:new FormControl('',[Validators.required,Validators.email]),
        cellphone:new FormControl(''),
      },
      {
        validators: this.customvalidator.passwordMatch('password','confirm_password')
      });
  }



  get userId()
  {
    return this.visitorRegForm.get('userId');
  }
  get firstNames()
  {
    return this.visitorRegForm.get('firstNames');
  }

  get lastName()
  {
    return this.visitorRegForm.get('lastName');
  }
  get username()
  {
    return this.visitorRegForm.get('username');
  }
  get password()
  {
    return this.visitorRegForm.get('password');
  }
  get confirm_password()
  {
    return this.visitorRegForm.get('confirm_password');
  }
  get email()
  {
    return this.visitorRegForm.get('email');
  }
   get cellphone()
  {
    return this.visitorRegForm.get('cellphone');
  }

 /*  RegisterUser()
  {
   //console.log(this.officerForm.value);
   //if we not adding then we edit
   
    if(this.registerform.valid)
    {
      this.userservice.registerUser(this.registerform.value)
      .subscribe({
        next:(res:RegisterUser)=>{
          alert('User registered successfully');
          this.router.navigate(['login']);
          console.log(res);
        },
        error:()=>{
         alert('Could no register officer ');
        }
        
      })
    }
  
  
  } */

  onSubmit()
  {

  }
}
