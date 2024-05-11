import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CurrencyService } from '../../../services/currency.service';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    ButtonComponent
  ],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss'
})

export class ListagemComponent implements OnInit {
  currencies: any[] = [];
  paginatedCurrencies: any[] = [];
  displayedColumns: string[] = ['code', 'name'];
  totalLength: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25];
  pageIndex: number = 0;

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
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCurrencies = this.currencies.slice(startIndex, endIndex);
    this.totalLength = this.currencies.length; 
    this.pageSize = event.pageSize;

    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}



