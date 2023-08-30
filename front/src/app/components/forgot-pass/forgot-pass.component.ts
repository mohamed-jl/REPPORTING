import { Component } from '@angular/core';
//import { error } from 'console';
import { EmailServiceService } from 'src/app/services/email-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent {

  public emailadress:String='';
  found:boolean|null=null;
  user:any;
  mail:string='';

  constructor(private emailService:EmailServiceService,private userservice:UserService){}
  


 sendResetEmail(){
   /*  this.userservice.existUser(this.emailadress).subscribe(
     value => {
       this.found = value;
       if (this.found){
         
         
         this.userservice.userByEmail(this.emailadress).subscribe(
          value =>{
            //this.emailService.sendEmail(value)
            this.user=value
            this.mail={to:`${this.user.uMail}`,subject:'password',text:`${this.user.password}`}
            this.emailService.sendEmail(this.mail)
            alert('email sent')
          }
         )
       }else{
        alert('email not found');
       }

     },
     error => {
       console.error('Error fetching', error);
     }
    ); */
    this.emailService.sendResetLink(this.mail).subscribe(
      response=>{
        console.log("succed")
      },(error)=>{
        console.error(error)
      }
    )
    console.log('sent')
    
  }

}
