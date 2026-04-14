import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  email = '';
  firstName = '';
  lastName = '';
  password = '';
  confirmPassword = '';
  submitted = false;
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Redirect to home if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  get emailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  get firstNameValid(): boolean {
    return this.firstName.trim().length >= 2;
  }

  get lastNameValid(): boolean {
    return this.lastName.trim().length >= 2;
  }

  get passwordValid(): boolean {
    return this.password.length >= 6;
  }

  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword && this.password.length >= 6;
  }

  get isValid(): boolean {
    return this.emailValid && this.firstNameValid && this.lastNameValid && this.passwordsMatch;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    if (!this.isValid) {
      return;
    }

    this.loading = true;
    this.authService.register(this.email, this.firstName, this.lastName, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.message || 'Registration failed. Please try again.';
      }
    });
  }
}
