import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{

  message:string = '';
  constructor(private userService:UserService){}
  ngOnInit(): void {
    this.forUser();
  }

  forUser(){
    this.userService.forUser().subscribe(
      (res) => {
        console.log(res);
        this.message = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
