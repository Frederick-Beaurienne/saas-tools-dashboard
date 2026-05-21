import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import {ApiEndpoints} from '../../config/api-endpoints';

import { Tool } from '../../../shared/models/tool.model';

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
}
