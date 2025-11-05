import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { PaymentService } from '../services/payment.service';
import { Payment } from './models/Payment.model';
import { PaymentStatus } from './models/paymentStatus.mode';
import { User } from '../../auth/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { PagedRequest } from './models/paged-request.model';

declare var bootstrap: any; // to manually close modal after success

@Component({
  selector: 'app-payments-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payments-list.component.html',
  styleUrl: './payments-list.component.css',
})
export class PaymentsListComponent {
  payments: Payment[] = [];
  amount = 0;
  loading = false;
  message = '';
  paymentStatus = PaymentStatus;
  user?: User;
  toasts: { message: string; type: string }[] = [];
  totalCount?: number;
  searchTerm?: string;
  pageSize: number = 10;
  pageNumber: number = 1;
  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    setTimeout(() => {
      this.loadPayments();
    }, 500);
  }

  loadPayments() {
    const request: PagedRequest = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      searchTerm: this.searchTerm?.trim() || '',
    };

    this.paymentService.getPayments(request).subscribe((res) => {
      this.payments = res.data.items;
      this.totalCount = res.data.totalCount;
    });
  }
  onPageChange(page: number) {
    this.pageNumber = page;
    this.loadPayments();
  }
  onSearchChange() {
    this.pageNumber = 1;
    this.loadPayments();
  }

  clearSearch() {
    this.searchTerm = '';
    this.loadPayments();
  }

  onCreatePayment() {
    if (this.amount <= 0) return;
    this.loading = true;

    this.paymentService.createPayment(this.amount).subscribe({
      next: () => {
        this.toastr.success('Payment created successfully!', 'Success');
        this.amount = 0;

        this.loadPayments();
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Failed to create payment.', 'Error');
        this.loading = false;
      },
    });
  }

  confirmPayment(id: string) {
    this.loading = true;
    this.paymentService.confirmPayment(id).subscribe({
      next: () => {
        this.toastr.success('Payment confirmed!', 'Success');
        this.loadPayments();
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Failed to confirm payment.', 'Error');
        this.loading = false;
      },
    });
  }

  get totalPages(): number[] {
    if (!this.totalCount || this.totalCount === 0) return [];

    const pages = Math.ceil(this.totalCount / this.pageSize);
    return Array.from({ length: pages }, (_, i) => i + 1);
  }
}
