import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {environment} from '../../../../environments/environment';
import {ApiEndpoints} from '../../config/api-endpoints';

import {Tool} from '../../../shared/models/tool.model';
import {Observable, forkJoin} from 'rxjs';

import {
  map
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  private readonly http = inject(HttpClient);

  getRecentTools() {
    return this.http.get<Tool[]>(
      `${environment.apiUrl}${ApiEndpoints.tools}?_sort=updated_at&_order=desc&_limit=8`
    );
  }

  getRecentTools30d() {

    const now =
      new Date();

    const last30Days =
      new Date(
        now.setDate(
          now.getDate() - 30
        )
      )
        .toISOString();

    return this.http.get<Tool[]>(
      `${environment.apiUrl}${ApiEndpoints.tools}` +
      `?_sort=updated_at` +
      `&_order=desc` +
      `&updated_at_gte=${last30Days}`
    );

  }

  getTools(search?: string): Observable<Tool[]> {

    if (search?.trim()) {

      return this
        .buildSearchRequest(
          search.trim()
        );

    }

    return this.http.get<Tool[]>(
      `${environment.apiUrl}${ApiEndpoints.tools}`
    );

  }

  getTool(
    id: number
  ) {
    return this.http.get<Tool>(
      `${environment.apiUrl}${ApiEndpoints.tools}/${id}`
    );
  }

  createTool(
    payload: Partial<Tool>
  ) {
    return this.http.post<Tool>(
      `${environment.apiUrl}${ApiEndpoints.tools}`,
      payload
    );
  }

  updateTool(
    id: number,
    payload: Partial<Tool>
  ) {
    return this.http.put<Tool>(
      `${environment.apiUrl}${ApiEndpoints.tools}/${id}`,
      payload
    );
  }

  deleteTool(
    id: number
  ) {
    return this.http.delete<void>(
      `${environment.apiUrl}${ApiEndpoints.tools}/${id}`
    );
  }

  // ---------- PRIVATE METHODS ---------- //

  private buildSearchRequest(
    term: string
  ): Observable<Tool[]> {

    const url =
      `${environment.apiUrl}${ApiEndpoints.tools}`;

    return forkJoin({

      byName:
        this.http.get<Tool[]>(
          url,
          {
            params:
              new HttpParams()
                .set(
                  'name_like',
                  term
                )
          }
        ),

      byVendor:
        this.http.get<Tool[]>(
          url,
          {
            params:
              new HttpParams()
                .set(
                  'vendor_like',
                  term
                )
          }
        ),

      byCategory:
        this.http.get<Tool[]>(
          url,
          {
            params:
              new HttpParams()
                .set(
                  'category_like',
                  term
                )
          }
        ),

      byDepartment:
        this.http.get<Tool[]>(
          url,
          {
            params:
              new HttpParams()
                .set(
                  'owner_department_like',
                  term
                )
          }
        ),

      byStatus:
        this.http.get<Tool[]>(
          url,
          {
            params:
              new HttpParams()
                .set(
                  'status_like',
                  term
                )
          }
        )

    }).pipe(

      map(results => {

        const merged =
          [
            ...results.byName,
            ...results.byVendor,
            ...results.byCategory,
            ...results.byDepartment,
            ...results.byStatus
          ];

        return merged.filter(
          (
            tool,
            index,
            self
          ) =>
            index ===
            self.findIndex(
              t =>
                t.id ===
                tool.id
            )
        );

      })

    );

  }
}
