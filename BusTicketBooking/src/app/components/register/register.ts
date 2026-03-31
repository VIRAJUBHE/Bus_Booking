import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent{

 user:User={
  name:"",
  email:"",
  password:"",
  phone:""
 }

 constructor(private authService:AuthService){}

 register(){

  this.authService.register(this.user).subscribe(()=>{

   alert("User Registered");

  });

 }

}