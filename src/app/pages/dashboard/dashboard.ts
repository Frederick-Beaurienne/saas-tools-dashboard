import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DashboardKpiCard}
  from './components/dashboard-kpi-card/dashboard-kpi-card';
import {DashboardRecentTools} from './components/dashboard-recent-tools/dashboard-recent-tools';
import {AnalyticsService} from '../../core/services/analytics/analytics.service';
import {take} from 'rxjs';
import {Analytics} from '../../core/models/analytics.model';
import {KpiCard} from '../../shared/models/kpi-card.model';
import {AppIcons} from '../../shared/ui/icons';
import {Tool} from '../../shared/models/tool.model';
import {ToolsService} from '../../core/services/tools/tools.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DashboardKpiCard,
    DashboardRecentTools
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  public analytics?: Analytics;
  kpis: KpiCard[] = [];
  recentTools: Tool[] = [];

  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly cdr: ChangeDetectorRef,
    private readonly toolsService: ToolsService
  ) {
  }

  ngOnInit(): void {
    this.loadAnalytics();
    this.loadRecentTools();
  }


  // ---------- LOADING ---------- //
  loadAnalytics(): void {

    this.analyticsService
      .getDashboardAnalytics()
      .pipe(take(1))
      .subscribe(response => {
        this.analytics = response;

        this.kpis = [
          {
            title: 'Monthly Budget',
            value: `€${(response.budget_overview.current_month_total / 1000).toFixed(1)}k`,
            secondaryValue: `/ €${(response.budget_overview.monthly_limit / 1000).toFixed(0)}k`,
            trend: response.kpi_trends.budget_change,
            icon: AppIcons.TrendingUp,
            accentFrom: '#14b8a6',
            accentTo: '#34d399',
          },
          {
            title: 'Active Tools',
            value: '147',
            trend: response.kpi_trends.tools_change,
            icon: AppIcons.Wrench,
            accentFrom: '#6366f1',
            accentTo: '#a855f7',
          },
          {
            title: 'Departments',
            value: '12',
            trend: response.kpi_trends.departments_change,
            icon: AppIcons.Building2,
            accentFrom: '#f97316',
            accentTo: '#ec4899',
          },
          {
            title: 'Cost/User',
            value: `€${response.cost_analytics.cost_per_user}`,
            trend: response.kpi_trends.cost_per_user_change,
            icon: AppIcons.Users,
            accentFrom: '#ec4899',
            accentTo: '#f43f5e',
          },
        ];

        this.cdr.detectChanges();
      });

  }

  loadRecentTools(): void {

    this.toolsService.getRecentTools()
      .pipe(take(1))
      .subscribe(response => {

        this.recentTools = response;
        this.cdr.detectChanges();

      });
  }
}
