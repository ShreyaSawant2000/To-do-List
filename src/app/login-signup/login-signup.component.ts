import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent {
  activeForm: string = 'login';
  formTitle: string = 'Log In';
  showLoginForm: boolean = true; //A boolean flag to determine whether to show the login form.
  signupUsers:any[]=[];  //An array to store information about signed-up users.
  signupObj:any ={   
    username:'',
    email:'',
    password:'',
  }; //An object that represents the user details during the signup process.
  loginObj:any={
    email:'',
    password:'',
  }; //An object that represents the user details during the login process.
  constructor(private router:Router,private authService:AuthService){
    const localData = localStorage.getItem('signUpUsers');
    if (localData!=null){
      this.signupUsers=JSON.parse(localData);
    }
  }
  toggleForm(formType: 'login' | 'signup') {
    this.activeForm = formType;
    this.showLoginForm = formType === 'login';
    this.formTitle = this.showLoginForm ? 'Log In' : 'Sign Up';
  }

  onSignUp(){
    const hashedPassword = bcrypt.hashSync(this.signupObj.password,10);
    console.log('Hashed Password:',hashedPassword);
    this.signupObj.password = hashedPassword;
    // Push the new user
    this.signupUsers.push(this.signupObj);
    // Store the updated array in local storage
    localStorage.setItem('signUpUsers',JSON.stringify(this.signupUsers));
    // Reset the signupObj
    this.signupObj = {
      username : '',
      email : '' ,
      password : ''

    };
    alert('Signup Successful')

  }
 
  onLogin() {
    const user = this.signupUsers.find((m) => m.email === this.loginObj.email);
  
    if (user !== undefined && bcrypt.compareSync(this.loginObj.password, user.password)) {
      // Successful login, set the token and navigate to landing page
      this.authService.setToken(this.loginObj.email); // Assuming email can be used as a simple token
      alert('Login Successful!');
      this.router.navigate(['/todo']);
    } else {
      // Invalid login, show alert
      alert('Invalid Username or Password');
      this.router.navigate(['/loginsignup']);
      // Clear email and password fields
      this.loginObj.email = '';
      this.loginObj.password = '';
    }
  }
  }
  