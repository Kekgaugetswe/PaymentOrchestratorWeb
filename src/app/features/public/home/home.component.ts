import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  loading = true;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    const user = this.authService.getUser();

    if (user) {
      // show spinner briefly before routing
      setTimeout(() => {
        this.router.navigate(['/payments']);
      }, 1200); // spinner visible for 1.2s
    } else {
      this.loading = false;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
