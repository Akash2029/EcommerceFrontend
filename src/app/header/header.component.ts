import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,
    MatToolbarModule, MatButtonModule, MatIconModule,RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit{

  constructor(private router:Router,
    private userAuth:UserAuthService,
    public userService:UserService
  ){

  }
  ngOnInit(): void {
    
  }

  isLoggedIn(){
    console.log(this.userAuth.isLoggedIn())
    return this.userAuth.isLoggedIn();
  }

  logOut(){
    console.log("akash checking clicked");
    localStorage.clear();
    this.router.navigate(['/'])
  
  }

  isAdmin(){
   return this.userAuth.isAdmin();
  }
}
