import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { LoginUserViewModel } from 'src/app/models/viewModels/loginUserViewModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup = this.fb.group({
    emailAddress: ['', Validators.required],
    password: ['', Validators.required],
  });

  loginUserViewModel: LoginUserViewModel;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  login() {
    this.userService.login(this.form.value).subscribe((res) => {
      this.loginUserViewModel = res;
      localStorage.setItem('token', 'Bearer ' + res.token);
    });
  }
}
