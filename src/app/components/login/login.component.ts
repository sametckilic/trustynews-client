import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup = this.fb.group({
    emailAdress: ['', Validators.required],
    passwword: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}
}
