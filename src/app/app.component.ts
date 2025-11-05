
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';
declare var bootstrap: any

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PaymentOrchestratorLite';

  toastMessage = '';
  toastType = 'success'; // success | danger | warning | info

  showToast(message: string, type: string = 'success') {
    this.toastMessage = message;
    this.toastType = type;

    const toastEl = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
}
}
