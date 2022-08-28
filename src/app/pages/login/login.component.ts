import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public password: string;
  public isPasswordSet: string;
  public errorMessage: string;

  constructor(
    private _router:Router
  ){

  }

  clickHandler(event: Event): void{
    console.log('password: ', this.password)

    if(!this.password) {
      this.errorMessage= 'Insira uma password válida'
      return
    }

    if(this.password?.length < 3) {
      this.errorMessage = 'Password must have at least 3 characters'
      return;
    }

    this._router.navigate(['../main']);
  }
}
