import {
  Component,
  computed,
  input,
} from '@angular/core';

import {
  BaseChartDirective,
} from 'ng2-charts';

import {
  ChartConfiguration,
} from 'chart.js';

import {
  Tool,
} from '../../../../core/models/tool.model';

@Component({
  selector:
    'app-analytics-growth-trends',

  standalone: true,

  imports: [
    BaseChartDirective,
  ],

  templateUrl:
    './analytics-growth-trends.html',

  styleUrl:
    './analytics-growth-trends.scss',
})
export class AnalyticsGrowthTrends {

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

  protected readonly growthData =
    computed(() => {

      const tools = [

        ...(this.activeToolsData()
          ?? []),

        ...(this.expiringToolsData()
          ?? []),

        ...(this.unusedToolsData()
          ?? []),
      ];

      const monthlyCounts =
        new Map<string, number>();

      tools.forEach(
        tool => {

          if (
            !tool.created_at
          ) {

            return;

          }

          const date =
            new Date(
              tool.created_at,
            );

          const label =
            date
              .toLocaleDateString(
                'en-US',
                {

                  month:
                    'short',

                  year:
                    '2-digit',
                },
              );

          monthlyCounts.set(

            label,

            (
              monthlyCounts.get(
                label,
              )
              ?? 0
            )
            + 1,
          );

        },
      );

      return [

        ...monthlyCounts
          .entries(),
      ];
    });

  protected readonly chartData =
    computed<
      ChartConfiguration<'line'>['data']
    >(() => ({

      labels:
        this
          .growthData()
          .map(
            (
              [
                label,
              ],
            ) =>
              label,
          ),

      datasets: [

        {
          data:
            this
              .growthData()
              .map(
                (
                  [
                    ,
                    count,
                  ],
                ) =>
                  count,
              ),

          borderWidth:
            3,

          pointRadius:
            4,

          pointHoverRadius:
            6,

          tension:
            .35,

          fill:
            true,

          borderColor:
            '#4f7cff',

          backgroundColor:
            'rgba(79,124,255,.18)',
        },
      ],
    }));

  protected readonly chartOptions:
    ChartConfiguration<'line'>['options']
    = {

    responsive:
      true,

    maintainAspectRatio:
      false,

    plugins: {

      legend: {
        display:
          false,
      },
    },

    scales: {

      x: {

        grid: {
          display:
            false,
        },

        ticks: {
          color:
            '#a1a1aa',
        },
      },

      y: {

        beginAtZero:
          true,

        grid: {
          color:
            'rgba(255,255,255,.05)',
        },

        ticks: {
          color:
            '#a1a1aa',
          precision:
            0,
        },
      },
    },
  };
}
