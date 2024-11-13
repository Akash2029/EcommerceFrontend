
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgForm }   from '@angular/forms';
import { UserService } from '../services/user.service';
import { error } from 'console';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{

  constructor(private userService: UserService,
    private useAuth: UserAuthService,
    private router:Router
  ){

  }
  ngOnInit(): void {
    localStorage.clear();
  }

  login(loginForm: NgForm){
    this.userService.login(loginForm.value).subscribe((res:any) => {
      this.useAuth.setRoles(res.user.role);
      this.useAuth.setToken(res.jwtToken);

      const role = res.user.role[0].roleName;
      console.log("akash checking",role);
      if(role === "admin"){
        this.router.navigate(['/admin']);
      }else{
        this.router.navigate(['/user'])
      }
      console.log(this.useAuth.getRoles());
      console.log(this.useAuth.getToken());
    },
  (error) =>
  {
    console.log(error);
  });
    console.log("form is Submitted",loginForm.value);
  }
  
}
