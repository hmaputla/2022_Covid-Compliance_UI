import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  id!: number;
  fullname!: String;
  email!: string;
  message!: string;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  submitForm() {
    alert('Submitted Successful');
  }
  ngOnInit(): void {
  }


  constructor(
   ) {}
    
    
 
  
}