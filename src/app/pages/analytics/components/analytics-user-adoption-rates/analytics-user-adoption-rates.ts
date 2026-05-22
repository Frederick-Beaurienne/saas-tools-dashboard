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

import {
  UserTool,
} from '../../../../core/models/user-tool.model';

@Component({
  selector:
    'app-analytics-user-adoption-rates',

  standalone: true,

  imports: [
    BaseChartDirective,
  ],

  templateUrl:
    './analytics-user-adoption-rates.html',

  styleUrl:
    './analytics-user-adoption-rates.scss',
})
export class AnalyticsUserAdoptionRates {

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

  readonly userToolsData =
    input<UserTool[] | null>(
      null,
    );

  private readonly frequencyWeight:
    Record<string, number> = {

    daily:
      4,

    weekly:
      3,

    monthly:
      2,

    rarely:
      1,
  };

  protected readonly adoptionData =
    computed(() => {

      const tools = [

        ...(this.activeToolsData()
          ?? []),

        ...(this.expiringToolsData()
          ?? []),

        ...(this.unusedToolsData()
          ?? []),
      ];

      const userTools =
        this.userToolsData()
        ?? [];

      const scores =
        new Map<number, number>();

      userTools.forEach(
        relation => {

          const weight =
            this.frequencyWeight[
              relation
                .usage_frequency
              ]
            ?? 0;

          scores.set(

            relation.tool_id,

            (
              scores.get(
                relation.tool_id,
              )
              ?? 0
            )
            + weight,
          );

        },
      );

      return tools

        .map(
          tool => ({

            tool,

            score:
              scores.get(
                tool.id,
              )
              ?? 0,
          }),
        )

        .filter(
          item =>
            item.score
            > 0,
        )

        .sort(
          (a, b) =>
            b.score
            - a.score,
        )

        .slice(
          0,
          6,
        );

    });

  protected readonly chartData =
    computed<
      ChartConfiguration<'bar'>['data']
    >(() => ({

      labels:
        this
          .adoptionData()
          .map(
            item =>

              item.tool.name
                .length > 18

                ? item.tool.name
                  .slice(
                    0,
                    18,
                  )
                + '…'

                : item.tool.name,
          ),

      datasets: [

        {
          data:
            this
              .adoptionData()
              .map(
                item =>
                  item.score,
              ),

          borderRadius:
            10,

          borderSkipped:
            false,

          backgroundColor: [

            '#7c3aed',
            '#8b5cf6',
            '#a855f7',
            '#c084fc',
            '#d946ef',
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

        beginAtZero:
          true,

        grid: {
          color:
            'rgba(255,255,255,.05)',
        },

        ticks: {
          color:
            '#a1a1aa',
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

          font: {
            size:
              11,
          },
        },
      },
    },
  };
}
