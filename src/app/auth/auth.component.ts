import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  myForm: FormGroup;
  PHONE_NUMBER_PATTERN = /^\d{10}$/;
  radio : Boolean= true;

  constructor(private formBuilder: FormBuilder, private authService: SocialAuthService) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      CountryCode:  ['', [Validators.required, Validators.pattern(this.PHONE_NUMBER_PATTERN)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      MembershipPlan1: ''
      // Add more form controls as needed
    });
  }

  onSubmit(){
    // this.myForm.get('MembershipPlan1').valueChanges.subscribe(value => {
    //   console.log('Selected value:', value);
    // });
    if(this.myForm.value.MembershipPlan1 == ''){
      this.radio = false;
      return;
    }
    this.radio = true
    console.log(this.myForm ,this.myForm.value.MembershipPlan1, "zsxdcfgvbhjndcfvghb")
  }

  myFunction() {
    let x : any = document.getElementById("loginpassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(user => {
        // Handle successful login
        console.log(user);
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  }
}
