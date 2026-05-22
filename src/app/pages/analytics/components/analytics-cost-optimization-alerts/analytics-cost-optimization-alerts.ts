import {
  Component,
  computed,
  input,
} from '@angular/core';

import {
  Tool,
} from '../../../../core/models/tool.model';

@Component({
  selector:
    'app-analytics-cost-optimization-alerts',

  standalone:
    true,

  imports: [],

  templateUrl:
    './analytics-cost-optimization-alerts.html',

  styleUrl:
    './analytics-cost-optimization-alerts.scss',
})
export class AnalyticsCostOptimizationAlerts {

  readonly activeToolsData =
    input<Tool[] | null>(
      null,
    );

  readonly expiringToolsData =
    input<Tool[] | null>(
      null,
    );

  readonly unusedToolsData =
    input<Tool[] | null>(
      null,
    );

  protected readonly alerts =
    computed(() => {

      const tools = [

        ...(this.activeToolsData()
          ?? []),

        ...(this.expiringToolsData()
          ?? []),

        ...(this.unusedToolsData()
          ?? []),
      ];

      const alerts: {

        type:
          'warning'
          | 'danger'
          | 'info';

        label:
          string;

        message:
          string;

      }[] = [];

      const highCost =
        [...tools]

          .sort(
            (a, b) =>

              (b.monthly_cost ?? 0)
              -
              (a.monthly_cost ?? 0),
          )

          .slice(
            0,
            1,
          );

      highCost.forEach(
        tool => {

          alerts.push({

            type:
              'danger',

            label:
              'High Cost',

            message:
              `${tool.name} costs € ${tool.monthly_cost}/mo`,
          });

        },
      );

      tools.forEach(
        tool => {

          const current =
            tool.monthly_cost
            ?? 0;

          const previous =
            tool.previous_month_cost
            ?? 0;

          if (

            previous > 0

            &&

            current
            > previous
            * 1.15

          ) {

            const delta =
              Math.round(

                (
                  (
                    current
                    - previous
                  )
                  / previous
                )
                * 100,
              );

            alerts.push({

              type:
                'warning',

              label:
                'Cost Increase',

              message:
                `${tool.name} +${delta}% vs last month`,
            });

          }

        },
      );

      tools

        .filter(
          tool =>

            tool.status
            === 'expiring'

            &&

            (
              tool.monthly_cost
              ?? 0
            )
            > 500,
        )

        .forEach(
          tool => {

            alerts.push({

              type:
                'info',

              label:
                'Expiring',

              message:
                `${tool.name} renewal approaching`,
            });

          },
        );

      return alerts

        .slice(
          0,
          3,
        );

    });

  protected badgeClass(
    type:
      'warning'
      | 'danger'
      | 'info',
  ): string {

    switch (
      type
      ) {

      case
      'danger':

        return 'bg-red-500/15 text-red-300';

      case
      'warning':

        return 'bg-amber-500/15 text-amber-300';

      case
      'info':

        return 'bg-primary/15 text-primary';

      default:

        return 'bg-primary/15 text-primary';
    }
  }

  getStatusClasses(status: string): string {

    switch (status?.toLowerCase()) {

      case 'info':
        return 'bg-gray-500/100 text-white';

      case 'warning':
        return 'bg-amber-500/100 text-white';

      case 'danger':
        return 'bg-rose-500/100 text-white';

      default:
        return 'bg-[var(--surface-hover)] text-white/80';
    }
  }
}
