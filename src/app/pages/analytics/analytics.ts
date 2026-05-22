import {
  Component,
  inject,
  OnInit, signal,
} from '@angular/core';

import {AnalyticsService}
  from '../../core/services/analytics/analytics.service';

import {ToolsService}
  from '../../core/services/tools/tools.service';

import {UserToolsService}
  from '../../core/services/user-tools/user-tools.service';

import {AnalyticsModel}
  from '../../core/models/analytics.model';

import {Tool}
  from '../../core/models/tool.model';

import {UserTool}
  from '../../core/models/user-tool.model';

import {AnalyticsSpendEvolution}
  from './components/analytics-spend-evolution/analytics-spend-evolution';
import {
  AnalyticsDepartmentCostBreakdown
} from './components/analytics-department-cost-breakdown/analytics-department-cost-breakdown';
import {AnalyticsBudgetProgress} from './components/analytics-budget-progress/analytics-budget-progress';
import {AnalyticsTopExpensiveTools} from './components/analytics-top-expensive-tools/analytics-top-expensive-tools';
import {AnalyticsUserAdoptionRates} from './components/analytics-user-adoption-rates/analytics-user-adoption-rates';
import {
  AnalyticsMostLeastUsedTools
} from './components/analytics-most-least-used-tools/analytics-most-least-used-tools';
import {AnalyticsDepartmentActivity} from './components/analytics-department-activity/analytics-department-activity';
import {AnalyticsGrowthTrends} from './components/analytics-growth-trends/analytics-growth-trends';
import {
  AnalyticsCostOptimizationAlerts
} from './components/analytics-cost-optimization-alerts/analytics-cost-optimization-alerts';
import {
  AnalyticsUnusedToolsWarnings
} from './components/analytics-unused-tools-warnings/analytics-unused-tools-warnings';
import {AnalyticsRoiCalculations} from './components/analytics-roi-calculations/analytics-roi-calculations';
import {AnalyticsUsagePatterns} from './components/analytics-usage-patterns/analytics-usage-patterns';

@Component({
  selector: 'app-analytics',
  imports: [
    AnalyticsSpendEvolution,
    AnalyticsDepartmentCostBreakdown,
    AnalyticsBudgetProgress,
    AnalyticsTopExpensiveTools,
    AnalyticsUserAdoptionRates,
    AnalyticsMostLeastUsedTools,
    AnalyticsDepartmentActivity,
    AnalyticsGrowthTrends,
    AnalyticsCostOptimizationAlerts,
    AnalyticsUnusedToolsWarnings,
    AnalyticsRoiCalculations,
    AnalyticsUsagePatterns
  ],
  standalone: true,
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class Analytics
  implements OnInit {

  private readonly analyticsService =
    inject(AnalyticsService);

  private readonly toolsService =
    inject(ToolsService);

  private readonly userToolsService =
    inject(UserToolsService);

  protected analyticsData =
    signal<AnalyticsModel | null>(
      null,
    );

  protected activeToolsData =
    signal<Tool[]>(
      [],
    );

  protected expiringToolsData =
    signal<Tool[]>(
      [],
    );

  protected unusedToolsData =
    signal<Tool[]>(
      [],
    );

  protected userToolsData =
    signal<UserTool[]>(
      [],
    );

  ngOnInit(): void {

    this.loadAnalytics();
    this.loadActiveToolsData();
    this.loadExpiringToolsData();
    this.loadUnusedToolsData();
    this.loadUserTools();
  }

  private loadAnalytics(): void {

    this.analyticsService
      .getDashboardAnalytics()
      .subscribe({
        next:
          (data) => {

            this.analyticsData.set(data,);
          },

        error:
          (error) => {

            console.error(
              'Analytics loading failed',
              error,
            );
          },
      });
  }

  private loadActiveToolsData(): void {

    this.toolsService
      .getActiveTools()
      .subscribe({
        next:
          (response) => {

            this.activeToolsData.set([...response],);

          },

        error:
          (error) => {

            console.error(
              'Active tools loading failed',
              error,
            );
          },
      });

  }

  private loadExpiringToolsData(): void {

    this.toolsService
      .getExpiringTools()
      .subscribe({
        next:
          (response) => {

            this.expiringToolsData.set([...response],);
          },

        error:
          (error) => {

            console.error(
              'Expiring tools loading failed',
              error,
            );
          },
      });

  }

  private loadUnusedToolsData(): void {

    this.toolsService
      .getUnusedTools()
      .subscribe({
        next:
          (response) => {

            this.unusedToolsData.set([...response],);

          },

        error:
          (error) => {

            console.error(
              'Unused tools loading failed',
              error,
            );
          },
      });

  }

  private loadUserTools(): void {

    this.userToolsService
      .getUserTools()
      .subscribe({
        next:
          (data) => {

            this.userToolsData.set([...data],);

          },

        error:
          (error) => {

            console.error(
              'User tools loading failed',
              error,
            );
          },
      });
  }
}
