import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Tools } from './pages/tools/tools';
import { Analytics } from './pages/analytics/analytics';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard
  },
  {
    path: 'tools',
    component: Tools
  },
  {
    path: 'analytics',
    component: Analytics
  }
];
