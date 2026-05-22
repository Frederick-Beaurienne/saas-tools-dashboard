import {
  Component,
  computed,
  input,
} from '@angular/core';

import {
  BaseChartDirective,
} from 'ng2-charts';

import {
  Chart,
  ChartConfiguration,
  ChartOptions,
  registerables,
} from 'chart.js';

import {
  Tool,
} from '../../../../core/models/tool.model';

Chart.register(
  ...registerables,
);

@Component({
  selector:
    'app-analytics-department-cost-breakdown',
  imports: [
    BaseChartDirective,
  ],
  standalone: true,
  templateUrl:
    './analytics-department-cost-breakdown.html',
  styleUrl:
    './analytics-department-cost-breakdown.scss',
})
export class AnalyticsDepartmentCostBreakdown {

  readonly toolsData =
    input<Tool[] | null>(
      null,
    );

  protected readonly departmentData =
    computed(() => {

      const tools =
        this.toolsData();

      if (!tools) {

        return {
          labels: [],
          values: [],
        };

      }

      const grouped =
        new Map<
          string,
          number
        >();

      for (
        const tool
        of tools
        ) {

        const department =
          tool.owner_department
          ?? 'Unknown';

        const cost =
          tool.monthly_cost
          ?? 0;

        grouped.set(
          department,

          (
            grouped.get(
              department,
            )
            ?? 0
          )
          + cost,
        );
      }

      return {
        labels:
          [...grouped.keys()],

        values:
          [...grouped.values()],
      };

    });

  protected readonly chartData =
    computed<
      ChartConfiguration<'doughnut'>['data']
    >(() => {

      const data =
        this.departmentData();

      return {

        labels:
        data.labels,

        datasets: [
          {

            data:
            data.values,

            borderWidth:
              0,

            hoverOffset:
              8,

            backgroundColor: [
              'rgba(99,102,241,0.9)',
              'rgba(56,189,248,0.9)',
              'rgba(16,185,129,0.9)',
              'rgba(245,158,11,0.9)',
              'rgba(236,72,153,0.9)',
              'rgba(168,85,247,0.9)',
            ],
          },
        ],
      };

    });

  protected readonly chartOptions:
    ChartOptions<'doughnut'> = {

    responsive: true,

    maintainAspectRatio:
      false,

    cutout:
      '60%',

    plugins: {

      legend: {

        position:
          'bottom',

        labels: {

          color:
            'rgb(148 163 184)',

          padding:
            16,

          usePointStyle:
            true,
        },
      },
    },
  };
}
