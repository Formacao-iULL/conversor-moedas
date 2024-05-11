import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://v6.exchangerate-api.com/v6/455bc7a8dad6771da16e0d75/codes';

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
