import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { HttpClient } from '@angular/common/http';

/**
 * export Invoice data
 */
export class Invoice {
    /**
     * declare id as a number
     */
  id?: number;
    /**
     * declare title as a string
     */
  title: string;
    /**
     * declare cost as a number
     */
  cost: number;
    /**
     * declare currency as a string (EUR as default)
     */
  currency: string = "EUR";
    /**
     * declare description as a string
     */
  description: string;
}

/**
 * declare data
 */
export class Sum {
    /**
     * declare sum as a number
     */
  sum: number;
    /**
     * declare currency as a string
     */
  currency: string;
}

@Injectable({
  providedIn: 'root'
})
export class CashboxService {

    /**
     * define cnstructor
     * @param {HttpClient} httpClient
     */
  constructor(
    private httpClient: HttpClient,
  ) {}

    /**
     * ad new invoice
     * @param {Invoice} invoice
     * @returns {Promise<void>}
     */
  async add(invoice: Invoice) {
    return await this.httpClient.post<void>("/api/cashbox", invoice).toPromise();
  }

    /**
     * let update the invoce
     * @param {Invoice} invoice
     * @returns {Promise<void>}
     */
  async update(invoice: Invoice): Promise<void> {
    return await this.httpClient.put<void>(`/api/cashbox/${invoice.id}`, invoice).toPromise();
  }

    /**
     * get info. invoice
     * @returns {Promise<Invoice[]>}
     */
  async all(): Promise<Invoice[]> {
    return await this.httpClient.get<Invoice[]>("/api/cashbox").toPromise();
  }

    /**
     * sum the invoces
     * @param {string} currency
     * @returns {Promise<Sum>}
     */

  async sum(currency = "EUR"): Promise<Sum> {
    return await this.httpClient.get<Sum>(`/api/cashbox/sum/${currency}`).toPromise();
  }

    /**
     * method for deleting an invoice
     * @param {Invoice} invoice
     * @returns {Promise<void>}
     */
  async delete(invoice: Invoice): Promise<void> {
    return await this.httpClient.delete<void>(`/api/cashbox/${invoice.id}`).toPromise();
  }
}
