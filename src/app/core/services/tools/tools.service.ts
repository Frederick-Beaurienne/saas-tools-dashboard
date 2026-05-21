import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../../environments/environment';
import {ApiEndpoints} from '../../config/api-endpoints';

import {Tool} from '../../../shared/models/tool.model';
import {of} from 'rxjs';

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
    // TODO: Re-enable DELETE request once API persistence is validated.

    // return this.http.delete<void>(
    //   `${environment.apiUrl}${ApiEndpoints.tools}/${id}`
    // );

    console.log(
      '[TEMP DELETE MOCK OF id:'+id+']',
      id
    );

    return of(void 0);
  }
}
