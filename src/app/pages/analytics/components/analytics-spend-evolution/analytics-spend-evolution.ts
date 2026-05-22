import {
  Component,
  computed,
  input,
} from '@angular/core';

import {
  ChartConfiguration,
  ChartOptions,
  registerables,
  Chart,
} from 'chart.js';

import {BaseChartDirective}
  from 'ng2-charts';

import {AnalyticsModel}
  from '../../../../core/models/analytics.model';

Chart.register(
  ...registerables,
);

@Component({
  selector: 'app-analytics-spend-evolution',
  standalone: true,
  imports: [
    BaseChartDirective,
  ],
  templateUrl:
    './analytics-spend-evolution.html',
  styleUrl:
    './analytics-spend-evolution.scss',
})
export class AnalyticsSpendEvolution {
  readonly analyticsData =
    input<AnalyticsModel | null>(
      null,
    );

  protected readonly spendData =
    computed(() => {

      const analytics =
        this.analyticsData();

      if (!analytics) {

        return null;

      }

      return {
        previous:
        analytics
          .budget_overview
          .previous_month_total,

        current:
        analytics
          .budget_overview
          .current_month_total,
      };

    });

  protected readonly chartData =
    computed<ChartConfiguration<'line'>['data']>(() => {

      const spend =
        this.spendData();

      if (!spend) {

        return {
          labels: [],
          datasets: [],
        };

      }

      return {
        labels: [
          'Previous Month',
          'Current Month',
        ],

        datasets: [
          {
            data: [
              spend.previous,
              spend.current,
            ],

            borderWidth: 3.5,

            pointRadius: 4,

            pointHoverRadius: 6,

            tension: 0.35,

            fill: true,

            borderColor:
              'rgb(99,102,241)',

            backgroundColor:
              (
                context,
              ): CanvasGradient | undefined => {

                const chart =
                  context.chart;

                const {
                  ctx,
                  chartArea,
                } = chart;

                if (!chartArea) {

                  return undefined;

                }

                const gradient =
                  ctx.createLinearGradient(
                    0,
                    chartArea.top,
                    0,
                    chartArea.bottom,
                  );

                gradient.addColorStop(
                  0,
                  'rgba(99,102,241,0.5)',
                );

                gradient.addColorStop(
                  1,
                  'rgba(99,102,241,0)',
                );

                return gradient;

              },
          },
        ],
      };

    });

  protected readonly chartOptions:
    ChartOptions<'line'> = {

    responsive: true,

    maintainAspectRatio:
      false,

    plugins: {

      legend: {
        display: false,
      },

    },

    scales: {

      x: {

        offset: true,

        grid: {
          display: false,
        },

        ticks: {
          color:
            'rgb(148 163 184)',
        },
      },

      y: {

        border: {
          display: false,
        },

        beginAtZero: false,

        ticks: {

          color:
            'rgb(148 163 184)',

          callback:
            (
              value,
            ) => {

              return '€ '
                + Number(
                  value,
                ).toLocaleString();

            },

          maxTicksLimit: 5,
        },

        grid: {

          color:
            'rgba(255,255,255,0.05)',

          drawTicks: false,
        },
      },
    },
  };
}
