import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ButtonComponent } from '../button/button.component';
import { CurrencyService } from '../../../services/currency.service';
import { FormsModule } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { CurrencyResponse } from '../../../model/currency.model';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent,
    FormsModule,
    NgFor,
    CommonModule,
    MatTableModule
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

  paginatedCurrencies: any[] = [];
  totalLength: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  transactionHistory: any[] = []; // Histórico de transações

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe((data: CurrencyResponse) => {
      if (data && data.supported_codes && Array.isArray(data.supported_codes)) {
        this.availableCurrencies = data.supported_codes.map((code: [string, string]) => code[0]);
        this.paginatedCurrencies = data.supported_codes.slice(0, this.pageSize);
        this.totalLength = data.supported_codes.length;
        this.convertCurrency();
        this.loadTransactionHistory(); // Carrega o histórico de transações do localStorage
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

  sendMoney(): void {
    const transaction = {
      date: new Date().toLocaleString(),
      originAmount: this.amountToConvert,
      convertedAmount: this.convertedAmount,
      exchangeRate: this.exchangeRate
    };

    // Salva no localStorage
    let transactions = JSON.parse(localStorage.getItem('transactionHistory') || '[]');
    transactions.push(transaction);
    localStorage.setItem('transactionHistory', JSON.stringify(transactions));

    // Atualiza o histórico local
    this.transactionHistory = transactions;
  }

  loadTransactionHistory(): void {
    const transactions = JSON.parse(localStorage.getItem('transactionHistory') || '[]');
    this.transactionHistory = transactions;
  }

  deleteTransaction(index: number): void {
    let transactions = JSON.parse(localStorage.getItem('transactionHistory') || '[]');
    transactions.splice(index, 1);
    localStorage.setItem('transactionHistory', JSON.stringify(transactions));
    this.transactionHistory = transactions;
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedCurrencies = this.availableCurrencies.slice(startIndex, endIndex);
  }
}

