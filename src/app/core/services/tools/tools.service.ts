import {inject, Injectable} from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpResponse
} from '@angular/common/http';

import {environment} from '../../../../environments/environment';
import {ApiEndpoints} from '../../config/api-endpoints';

import {Tool} from '../../../shared/models/tool.model';
import {Observable} from 'rxjs';

import {map} from 'rxjs/operators';

export interface PaginatedTools {

  data: Tool[];

  total: number;

}

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  private readonly http =
    inject(HttpClient);

  getRecentTools() {

    return this.http.get<Tool[]>(
      `${environment.apiUrl}${ApiEndpoints.tools}` +
      `?_sort=updated_at` +
      `&_order=desc` +
      `&_limit=8`
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
    order: 'asc' | 'desc' = 'asc',
    page = 1,
    limit = 10
  ): Observable<PaginatedTools> {

    let params =
      new HttpParams()
        .set(
          '_page',
          page
        )
        .set(
          '_limit',
          limit
        );

    if (search?.trim()) {

      params =
        params.set(
          'q',
          search.trim()
        );

    }

    if (sort) {

      params =
        params
          .set(
            '_sort',
            sort
          )
          .set(
            '_order',
            order
          );

    }

    return this.http.get<Tool[]>(
      `${environment.apiUrl}${ApiEndpoints.tools}`,
      {
        params,
        observe: 'response'
      }
    ).pipe(
      map(
        (
          response:
          HttpResponse<Tool[]>
        ) => ({

          data:
            response.body
            ?? [],

          total:
            Number(
              response.headers.get(
                'X-Total-Count'
              )
            ) || 0

        })
      )
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

}
