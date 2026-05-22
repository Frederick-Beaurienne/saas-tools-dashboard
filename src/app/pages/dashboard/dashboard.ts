import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DashboardKpiCard}
  from './components/dashboard-kpi-card/dashboard-kpi-card';
import {DashboardRecentTools} from './components/dashboard-recent-tools/dashboard-recent-tools';
import {AnalyticsService} from '../../core/services/analytics/analytics.service';
import {forkJoin, take} from 'rxjs';
import {AnalyticsModel} from '../../core/models/analytics.model';
import {KpiCard} from '../../shared/models/kpi-card.model';
import {AppIcons} from '../../shared/ui/icons';
import {Tool} from '../../core/models/tool.model';
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

  public analytics?: AnalyticsModel;
  kpis: KpiCard[] = [];
  recentTools: Tool[] = [];
  allTools: Tool[] = [];

  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly cdr: ChangeDetectorRef,
    private readonly toolsService: ToolsService
  ) {
  }

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadRecentTools();
  }


  // ---------- LOADING ---------- //
  loadDashboardData(): void {

    forkJoin({

      analytics: this.analyticsService.getDashboardAnalytics(),

      tools: this.toolsService.getAllTools(),
    })
      .subscribe({

        next: ({analytics, tools,}) => {

          this.allTools = [...tools];
          this.analytics = analytics;

          this.kpis = [

            {
              title: 'Monthly Budget',

              value:
                `€${(
                  analytics
                    .budget_overview
                    .current_month_total
                  / 1000
                ).toFixed(1)}k`,

              secondaryValue:
                `/ €${(
                  analytics
                    .budget_overview
                    .monthly_limit
                  / 1000
                ).toFixed(0)}k`,

              trend: analytics.kpi_trends.budget_change,
              icon: AppIcons.TrendingUp,
              accentFrom: '#14b8a6',
              accentTo: '#2dd4bf',
            },

            {
              title:
                'Active Tools',

              value:
                tools
                  .filter(tool => tool.status === 'active',)
                  .length
                  .toString(),

              trend: analytics.kpi_trends.tools_change,
              icon: AppIcons.Wrench,
              accentFrom: '#7c3aed',
              accentTo: '#8b5cf6',
            },

            {
              title: 'Departments',

              value: new Set(tools.map(tool => tool.owner_department,),)
                .size
                .toString(),

              trend: analytics.kpi_trends.departments_change,
              icon: AppIcons.Building2,
              accentFrom: '#f97316',
              accentTo: '#fb7185',
            },

            {
              title: 'Cost/User',
              value: `€${analytics.cost_analytics.cost_per_user}`,
              trend: analytics.kpi_trends.cost_per_user_change,
              icon: AppIcons.Users,
              accentFrom: '#ec4899',
              accentTo: '#f43f5e',
            },
          ];

        },

        error:
          error => console.error('Dashboard loading failed', error,),
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
