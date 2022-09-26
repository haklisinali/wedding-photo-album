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
  public errorMessagePt: string;
  public errorMessageEn: string;

  constructor(
    private _router:Router,
    private _sharedData: SharedDataService
  ){}

  clickHandler(event: Event): void{
    const hashDigest = sha256(this.password);
    const hmacDigest = Base64.stringify(hashDigest);

    if(!this.password) {
      this.errorMessagePt= 'Insira uma password válida'
      this.errorMessageEn= 'Insert a valid password'
      return
    }

    if(hmacDigest !== 'MaqtP45KwJxG7TMUdeVvWNO2MPCGdWyTu13Ke7CZhp4=') {
      this.errorMessageEn = 'Wrong password, try again please'
      this.errorMessagePt = 'Password errada, tente novamente'
      return;
    }

    this._sharedData.isLoggedIn = true;
    this._router.navigate(['../main']);
  }
}
