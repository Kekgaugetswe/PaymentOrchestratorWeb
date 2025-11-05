import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../payments-list/models/Payment.model';
import { PagedRequest } from '../payments-list/models/paged-request.model';
import { PaginatedResponse } from '../payments-list/models/paginated-response.model';
import { ApiResponse } from '../payments-list/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {



  private baseUrl = `${environment.apiBaseUrl}/api/payments`;

  constructor(private http: HttpClient) {}

  getPayments(request: PagedRequest) {
  let params = new HttpParams()
    .set('pageNumber', request.pageNumber)
    .set('pageSize', request.pageSize);

  if (request.searchTerm && request.searchTerm.trim().length > 0) {
    params = params.set('searchTerm', request.searchTerm.trim());
  }

  return this.http.get<ApiResponse<PaginatedResponse<Payment>>>(this.baseUrl, { params });
}

  createPayment(amount: number): Observable<Payment> {
    return this.http.post<Payment>(`${this.baseUrl}?addAuth=true`, { amount });
  }

  confirmPayment(paymentId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/simulate-confirmation/${paymentId}?addAuth=true`, {});
  }
}
