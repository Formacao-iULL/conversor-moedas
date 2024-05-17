import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ButtonComponent } from '../button/button.component';
import { CurrencyService } from '../../../services/currency.service';
import { FormsModule } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';
import { CurrencyResponse } from '../../../model/currency.model';
@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent,
    FormsModule,
    NgFor,
    CommonModule
  ],
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.scss']
})
export class ConversorComponent implements OnInit {
  availableCurrencies: string[] = [];
  originCurrency: string = 'BRL';
  targetCurrency: string = 'EUR';
  amountToConvert: number = 1000;
  convertedAmount: number = 0;
  exchangeRate: number = 0;
  lastUpdated: string = '';

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe((data: CurrencyResponse) => {
      if (data && data.supported_codes && Array.isArray(data.supported_codes)) {
        this.availableCurrencies = data.supported_codes.map((code: [string, string]) => code[0]);
        this.convertCurrency();
      } else {
        console.error('Dados retornados não são um array:', data);
      }
    });
  }

  updateOriginCurrency(currency: string): void {
    this.originCurrency = currency;
    this.convertCurrency();
  }

  updateTargetCurrency(currency: string): void {
    this.targetCurrency = currency;
    this.convertCurrency();
  }

  onAmountChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.value) {
      this.amountToConvert = parseFloat(inputElement.value);
      this.convertCurrency();
    }
  }

  convertCurrency(): void {
    if (this.originCurrency && this.targetCurrency && this.amountToConvert) {
      this.currencyService.getConversionRate(this.originCurrency, this.targetCurrency).subscribe(rate => {
        this.exchangeRate = rate;
        this.convertedAmount = this.amountToConvert * rate;
        this.lastUpdated = new Date().toLocaleTimeString();
      });
    }
  }
}
