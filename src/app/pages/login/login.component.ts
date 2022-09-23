import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as sha256 from 'crypto-js/sha256';
import * as Base64 from 'crypto-js/enc-base64';
import { SharedDataService } from 'src/app/core/services/shared-data.service';

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
    private _router:Router,
    private _sharedData: SharedDataService
  ){}

  clickHandler(event: Event): void{
    const hashDigest = sha256(this.password);
    const hmacDigest = Base64.stringify(hashDigest);

    if(!this.password) {
      this.errorMessage= 'Insira uma password válida'
      return
    }

    if(this.password?.length < 3) {
      this.errorMessage = 'Password must have at least 3 characters'
      return;
    }

    if(hmacDigest !== 'tk7zU+GHGLPlz0vIBWqYQfpCF7V3pYs0n9gyiATy7Q4=') {
      this.errorMessage = 'Wrong password, try again please'
      return;
    }

    this._sharedData.isLoggedIn = true;
    this._router.navigate(['../main']);
  }
}
