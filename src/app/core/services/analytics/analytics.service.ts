import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiEndpoints} from '../../config/api-endpoints';
import { Analytics } from '../../models/analytics.model';
import {environment} from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {

  constructor(
    private readonly http: HttpClient
  ) {}

  getDashboardAnalytics() {
    return this.http.get<Analytics>(
      `${environment.apiUrl}${ApiEndpoints.analytics}`
    );
  }
}
