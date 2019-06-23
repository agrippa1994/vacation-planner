import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { HttpClient } from '@angular/common/http';

export class Invoice {
  id?: number;
  title: string;
  cost: number;
  currency: string = "EUR";
  description: string;
}

export class Sum {
  sum: number;
  currency: string;
}

@Injectable({
  providedIn: 'root'
})
export class CashboxService {

  constructor(
    private httpClient: HttpClient,
  ) {}

  async add(invoice: Invoice) {
    return await this.httpClient.post<void>("/api/cashbox", invoice).toPromise();
  }

  async all(): Promise<Invoice[]> {
    return await this.httpClient.get<Invoice[]>("/api/cashbox").toPromise();
  }

  async sum(): Promise<Sum> {
    return await this.httpClient.get<Sum>("/api/cashbox/sum").toPromise();
  }
}
