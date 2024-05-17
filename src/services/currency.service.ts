import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrencyResponse } from '../model/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://v6.exchangerate-api.com/v6/455bc7a8dad6771da16e0d75/codes';
  private conversionUrl = 'https://v6.exchangerate-api.com/v6/455bc7a8dad6771da16e0d75/pair/';

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<CurrencyResponse> {
    return this.http.get<CurrencyResponse>(this.apiUrl);
  }

  getConversionRate(from: string, to: string): Observable<number> {
    return this.http.get<{ conversion_rate: number }>(`${this.conversionUrl}${from}/${to}`)
      .pipe(map(response => response.conversion_rate));
  }
}
