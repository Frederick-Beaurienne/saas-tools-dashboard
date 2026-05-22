import {inject, Injectable}
  from '@angular/core';

import {HttpClient}
  from '@angular/common/http';

import {environment}
  from '../../../../environments/environment';

import {ApiEndpoints}
  from '../../config/api-endpoints';

import {UserTool}
  from '../../models/user-tool.model';

@Injectable({
  providedIn: 'root',
})
export class UserToolsService {

  private readonly http =
    inject(HttpClient);

  getUserTools() {

    return this.http.get<UserTool[]>(
      `${environment.apiUrl}${ApiEndpoints.userTools}`
    );

  }

}
