import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email: string = '';
  otp: string = '';
  otpSent: boolean = false;
  errorMsg: string = '';
  timer: number = 0;
  interval: any;
  otpTimer: number = 300; // 5 min
  otpInterval: any;
  returnUrl: string = '/';
  name: string = '';
  formSubmitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  isSending = false;
  successMsg: string = '';
  resendTimer: number = 30;
  resendInterval: any;
  canResend: boolean = false;

  startResendTimer() {
  this.canResend = false;
  this.resendTimer = 30;

  this.resendInterval = setInterval(() => {
    this.resendTimer--;

    if (this.resendTimer <= 0) {
      clearInterval(this.resendInterval);
      this.canResend = true;
    }
  }, 1000);
}

sendOtp() {

  this.errorMsg = '';
  this.successMsg = '';

  // ✅ NAME VALIDATION (only required)
  if (!this.name || this.name.trim().length === 0) {
    this.errorMsg = "Name is required";
    return;
  }

  // ✅ EMAIL VALIDATION (must be gmail)
  if (!this.email || this.email.trim().length === 0) {
    this.errorMsg = "Email is required";
    return;
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!emailPattern.test(this.email.trim())) {
    this.errorMsg = "Only @gmail.com emails are allowed";
    return;
  }
  this.errorMsg = '';
  this.successMsg = '';

  // ✅ NAME VALIDATION (only required)
  if (!this.name || this.name.trim().length === 0) {
    this.errorMsg = "Name is required";
    return;
  }

  // ✅ EMAIL VALIDATION (must be gmail)
  if (!this.email || this.email.trim().length === 0) {
    this.errorMsg = "Email is required";
    return;
  }

  if (!emailPattern.test(this.email.trim())) {
    this.errorMsg = "Only @gmail.com emails are allowed";
    return;
  }
  this.errorMsg = '';
  this.successMsg = '';

  // ✅ NAME VALIDATION (only required)
  if (!this.name || this.name.trim().length === 0) {
    this.errorMsg = "Name is required";
    return;
  }

  // ✅ EMAIL VALIDATION (must be gmail)
  if (!this.email || this.email.trim().length === 0) {
    this.errorMsg = "Email is required";
    return;
  }


  if (!emailPattern.test(this.email.trim())) {
    this.errorMsg = "Only @gmail.com emails are allowed";
    return;
  }
  this.errorMsg = '';
  this.successMsg = '';

  // ✅ NAME VALIDATION (only required)
  if (!this.name || this.name.trim().length === 0) {
    this.errorMsg = "Name is required";
    return;
  }

  // ✅ EMAIL VALIDATION (must be gmail)
  if (!this.email || this.email.trim().length === 0) {
    this.errorMsg = "Email is required";
    return;
  }


  if (!emailPattern.test(this.email.trim())) {
    this.errorMsg = "Only @gmail.com emails are allowed";
    return;
  }

  if (this.isSending) return;

  this.isSending = true;
  this.errorMsg = '';
  this.successMsg = '';

  this.authService.sendOtp(this.email.trim(), this.name.trim()).subscribe({
    next: (res: any) => {

      this.successMsg = res.message || "OTP sent successfully ✅";

      this.otpSent = true;
      this.startOtpTimer();
      this.startResendTimer(); // 🔥 NEW

      this.isSending = false;
    },
    error: (err) => {
      this.errorMsg = err.error?.message || "Failed to send OTP";
      this.isSending = false;
    }
  });
}
resendOtp() {
  if (!this.canResend) return;

  this.sendOtp();
}

startOtpTimer() {

  this.otpTimer = 300;

  this.otpInterval = setInterval(() => {
    this.otpTimer--;

    if (this.otpTimer <= 0) {
      clearInterval(this.otpInterval);
      this.errorMsg = "OTP expired. Please request again.";
    }

  }, 1000);
}

get formattedTime(): string {
  const min = Math.floor(this.otpTimer / 60);
  const sec = this.otpTimer % 60;

  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

  ngOnInit() {
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  startTimer() {
  this.timer = 30;

  this.interval = setInterval(() => {
    this.timer--;

    if (this.timer <= 0) {
      clearInterval(this.interval);
    }
  }, 1000);
}

  verifyOtp() {
  this.errorMsg = '';

  this.authService.verifyOtp(this.email, this.otp, this.name).subscribe({
    next: (res: any) => {

      localStorage.setItem('userId', res.userId);

      alert('Login Successful');

      // 🔥 Redirect back to where user came from
      this.router.navigateByUrl(this.returnUrl);

    },
    error: (err) => {
      this.errorMsg = err.error;
    }
  });
}
}
