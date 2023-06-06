import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginDto } from 'src/models/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  showPassword: boolean = false
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.required,
      Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    ])
  });
  

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
}

  login(){
    if (this.loginForm.invalid) {
      return;
    }
    const formData = this.loginForm.value;
  
    const loginDto: LoginDto = {
      email: formData.email || '',
      password: formData.password || ''
    };
  
    this.authService.login(loginDto).subscribe(u => {
      console.log(u)
      this.authService.setLoggedUser(u);
      this.loginForm.reset();
      this.router.navigate(["/home"])
    });
  }
}
