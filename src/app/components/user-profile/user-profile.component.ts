import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HealthFormComponent } from '../health-form/health-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile !: FormGroup;
  actionBtn:string = "Update";

  constructor( 
    private router:Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private observer: BreakpointObserver,
    private api:ApiService,
    private userservice:UserService
    ) { }

    users!: User[];
    userInte!:User;
  ngOnInit(): void
  {
    this.userProfile = this.formBuilder.group
    ({
    
      User_id: ['', Validators.required],
      //Camp_id: ['', Validators.required],
      //First_name: ['', Validators.required],
      //Last_name: ['', Validators.required],
      Email: ['', Validators.required],
      //Type: ['', Validators.required],
      Cellphone_number: ['', Validators.required],
      //Gender: ['', Validators.required],
      Password: ['', Validators.required],
      //newPassword: ['', Validators.required],
    });
    
    this.getUserProfile(`${sessionStorage.getItem('user_id')}`);
   // alert(`${sessionStorage.getItem('user_id')}`)
  
    //this.userProfile.controls['Password'].setValue(this.userInte.User_id);
   // this.userProfile.controls['Password'].setValue(this.userInte.Password);
  }
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  openDialog() {
    this.dialog.open(HealthFormComponent, {
      width: '30%'
    });
  }
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }



          getUserProfile(user:string):void
          {
            this.api.getUser(user)
            .subscribe({
              next:(res:any)=>
              {
                console.log(res)
                this.users=res.data;
                this.userProfile.controls['User_id'].setValue(this.users[0].User_id);
                this.userProfile.controls['Password'].setValue(this.users[0].Password);
                this.userProfile.controls['Cellphone_number'].setValue(this.users[0].Cellphone_number);
                
                this.userProfile.controls['Email'].setValue(this.users[0].Email);
                
              }})}


  updateUser(userid: string) {
    this.userservice.updateofficerInfo(this.userProfile.value,userid)
      .subscribe({
        next: (res: any) => {
           this.users = res.data;
           this.userProfile.controls['User_id'].setValue(this.users[0].User_id);
          this.userProfile.controls['Password'].setValue(this.users[0].Password);
          this.userProfile.controls['Cellphone_number'].setValue(this.users[0].Cellphone_number);
          this.userProfile.controls['Email'].setValue(this.users[0].Email); 
 
          //this.officerprofile.reset();
         alert('User details UPdated')
        }, error: () => {
          alert("Error while updating user");
        }
      })
  }

  onUpdate() {
    this.updateUser(`${sessionStorage.getItem('user_id')}`);
   // alert(`${sessionStorage.getItem('user_id')}`)
    location.reload()
  }

      user=(this.get())
      get()
      {
        sessionStorage.getItem('user_id');
      }
      deletesession()
      {
        sessionStorage.removeItem('user_id')
        this.router.navigate(['/login']);
      }
  
}
  

/*   updateUser()
  {
    this.api.updateUser(this.userProfile.value)
    .subscribe({
      next:(res)=>{
        alert("user details updated Successfully");
        this.userProfile.reset();
      },error:()=>{
        alert("Error while updating user");
      }
    })
  } */
/*    getUser(){
     this.api.getUser(`$(this.user)`)
     .subscribe({
       next:(res:any)=>{
         console.log(res)
         this.userProfile.patchValue(res);
       //  this.userProfile.controls.name.patchValue(res.name); // set value of single property
 
       }})} */