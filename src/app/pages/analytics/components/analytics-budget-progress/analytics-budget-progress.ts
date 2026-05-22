import {
  Component,
  computed,
  input,
} from '@angular/core';

import {
  NgStyle,
} from '@angular/common';

import {
  LucideAngularModule,
} from 'lucide-angular';

import {
  TrendingUp,
} from 'lucide-angular';

import {
  AnalyticsModel,
} from '../../../../core/models/analytics.model';

@Component({
  selector:
    'app-analytics-budget-progress',

  standalone: true,

  imports: [
    NgStyle,
    LucideAngularModule,
  ],

  templateUrl:
    './analytics-budget-progress.html',

  styleUrl:
    './analytics-budget-progress.scss',
})
export class AnalyticsBudgetProgress {

  protected readonly icon =
    TrendingUp;

  readonly analyticsData =
    input<AnalyticsModel | null>(
      null,
    );

  protected readonly budgetData =
    computed(() => {

      const analytics =
        this.analyticsData();

      if (!analytics) {

        return null;

      }

      return {

        current:
        analytics
          .budget_overview
          .current_month_total,

        limit:
        analytics
          .budget_overview
          .monthly_limit,

        utilization:
        analytics
          .budget_overview
          .budget_utilization,

        trend:
        analytics
          .budget_overview
          .trend_percentage,
      };

    });

  protected readonly displayValue =
    computed(() => {

      const data =
        this.budgetData();

      if (!data) {

        return '';

      }

      return (
        '€'
        + (
          data.current
          / 1000
        ).toFixed(1)
        + 'k'
      );

    });

  protected readonly secondaryValue =
    computed(() => {

      const data =
        this.budgetData();

      if (!data) {

        return '';

      }

      return (
        '/ €'
        + (
          data.limit
          / 1000
        ).toFixed(0)
        + 'k'
      );

    });
}
