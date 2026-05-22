import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {environment} from '../../../../environments/environment';
import {ApiEndpoints} from '../../config/api-endpoints';

import {Tool} from '../../../shared/models/tool.model';
import {forkJoin, Observable} from 'rxjs';

import {map} from 'rxjs/operators';

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

  getTools(
    search?: string,
    sort?: string,
    order: 'asc' | 'desc' = 'asc'
  ): Observable<Tool[]> {

    if (search?.trim()) {

      return this.buildSearchRequest(
        search.trim(),
        sort,
        order
      );

    }

    let params =
      new HttpParams();

    if (sort) {

      params =
        params
          .set('_sort', sort)
          .set('_order', order);

    }

    return this.http.get<Tool[]>(
      `${environment.apiUrl}${ApiEndpoints.tools}`, {params}
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
    term: string,
    sort?: string,
    order: 'asc' | 'desc' = 'asc'
  ): Observable<Tool[]> {

    const url =
      `${environment.apiUrl}${ApiEndpoints.tools}`;

    return forkJoin({

      byName:
        this.http.get<Tool[]>(
          url,
          {
            params:
              this.buildParams(
                'name_like',
                term,
                sort,
                order
              )
          }
        ),

      byVendor:
        this.http.get<Tool[]>(
          url,
          {
            params:
              this.buildParams(
                'vendor_like',
                term,
                sort,
                order
              )
          }
        ),

      byCategory:
        this.http.get<Tool[]>(
          url,
          {
            params:
              this.buildParams(
                'category_like',
                term,
                sort,
                order
              )
          }
        ),

      byDepartment:
        this.http.get<Tool[]>(
          url,
          {
            params:
              this.buildParams(
                'owner_department_like',
                term,
                sort,
                order
              )
          }
        ),

      byStatus:
        this.http.get<Tool[]>(
          url,
          {
            params:
              this.buildParams(
                'status_like',
                term,
                sort,
                order
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
          (tool, index, self) =>
            index === self.findIndex(t => t.id === tool.id)
        );

      })
    );

  }

  private buildParams(
    field: string,
    term: string,
    sort?: string,
    order: 'asc' | 'desc' = 'asc'
  ): HttpParams {

    let params =
      new HttpParams()
        .set(field, term);

    if (sort) {

      params =
        params
          .set('_sort', sort)
          .set('_order', order);

    }

    return params;

  }
}
