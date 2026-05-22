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
    'app-analytics-top-expensive-tools',

  standalone: true,

  imports: [
    BaseChartDirective,
  ],

  templateUrl:
    './analytics-top-expensive-tools.html',

  styleUrl:
    './analytics-top-expensive-tools.scss',
})
export class AnalyticsTopExpensiveTools {

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

  protected readonly mergedTools =
    computed(() => {

      return [

        ...(this.activeToolsData()
          ?? []),

        ...(this.expiringToolsData()
          ?? []),

        ...(this.unusedToolsData()
          ?? []),
      ];

    });

  protected readonly topTools =
    computed(() => {

      return this
        .mergedTools()
        .filter(
          tool =>
            tool.monthly_cost
            != null,
        )
        .sort(
          (a, b) =>
            b.monthly_cost
            - a.monthly_cost,
        )
        .slice(
          0,
          5,
        );

    });

  protected readonly chartData =
    computed<
      ChartConfiguration<'bar'>['data']
    >(() => ({

      labels:
        this
          .topTools()
          .map(
            tool =>

              tool.name.length
              > 18

                ? tool.name
                  .slice(
                    0,
                    18,
                  )
                + '…'

                : tool.name,
          ),

      datasets: [

        {
          barPercentage:
            0.7,

          categoryPercentage:
            0.8,

          data:
            this
              .topTools()
              .map(
                tool =>
                  tool.monthly_cost,
              ),

          borderRadius:
            10,

          borderSkipped:
            false,

          backgroundColor: [

            '#4f7cff',
            '#6f6dff',
            '#8b5cf6',
            '#b26dff',
            '#ec4899',
          ],
        },
      ],
    }));

  protected readonly chartOptions:
    ChartConfiguration<'bar'>['options']
    = {

    responsive:
      true,

    maintainAspectRatio:
      false,

    indexAxis:
      'y',

    plugins: {

      legend: {
        display:
          false,
      },
    },

    scales: {

      x: {


        grid: {
          color:
            'rgba(255,255,255,.05)',
        },

        ticks: {

          color:
            '#a1a1aa',

          callback:
            value =>
              '€ '
              + value,
        },
      },

      y: {

        grid: {
          display:
            false,
        },

        ticks: {

          color:
            '#a1a1aa',

          maxRotation:
            0,

          minRotation:
            0,

          font: {
            size:
              11,
          },
        },
      },
    },
  };
}
