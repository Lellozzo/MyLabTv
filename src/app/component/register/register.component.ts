import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterDto } from 'src/models/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  
  registerForm = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[a-zA-Z\s]*$/)
    ]),
    cognome: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[a-zA-Z\s]*$/)
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-z0-9_]{3,}$/i)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    ])
  })

  constructor(private authService: AuthService, private router: Router){}
  
  
  ngOnInit(): void {}

  register() {
    if (this.registerForm.invalid) {
      return;
    }
    const formData = this.registerForm.value;
    const registerDto: RegisterDto = {
      nome: formData.nome || '',
      cognome: formData.cognome || '',
      username: formData.username || '',
      email: formData.email || '',
      password: formData.password || ''
    };
  
    this.authService.register(registerDto).subscribe(u => {
      console.log(u)
      this.registerForm.reset();
      this.router.navigate(["/login"])
    });
  }
}
