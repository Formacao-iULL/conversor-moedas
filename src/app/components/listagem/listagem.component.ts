import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CurrencyService } from '../../../services/currency.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    ButtonComponent,
    FormsModule
  ],
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})

export class ListagemComponent implements OnInit {
  currencies: any[] = [];
  paginatedCurrencies: any[] = [];
  displayedColumns: string[] = ['code', 'name'];
  totalLength: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25];
  pageIndex: number = 0;
  searchText: string = '';

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencyService.getCurrencies().subscribe(data => {
      if (data && data.supported_codes && Array.isArray(data.supported_codes)) {
        this.currencies = data.supported_codes;
        this.totalLength = this.currencies.length;
        this.paginatedCurrencies = this.currencies.slice(0, this.pageSize);
      } else {
        console.error('Dados retornados não são um array:', data);
      }
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedCurrencies = this.currencies.slice(startIndex, endIndex);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  searchCurrencies() {
    const filteredCurrencies = this.currencies.filter(currency =>
      currency[0].toLowerCase().includes(this.searchText.toLowerCase()) ||
      currency[1].toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.totalLength = filteredCurrencies.length;
    this.paginatedCurrencies = filteredCurrencies.slice(0, this.pageSize);
    this.pageIndex = 0;
  }
}
