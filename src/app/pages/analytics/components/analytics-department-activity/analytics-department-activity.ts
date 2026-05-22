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
    'app-analytics-department-activity',

  standalone: true,

  imports: [
    BaseChartDirective,
  ],

  templateUrl:
    './analytics-department-activity.html',

  styleUrl:
    './analytics-department-activity.scss',
})
export class AnalyticsDepartmentActivity {

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

  protected readonly departmentData =
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

      const toolMap =
        new Map(
          tools.map(
            tool => [
              tool.id,
              tool,
            ],
          ),
        );

      const scores =
        new Map<string, number>();

      userTools.forEach(
        relation => {

          const tool =
            toolMap.get(
              relation.tool_id,
            );

          if (!tool) {

            return;

          }

          const department =
            tool
              .owner_department;

          const weight =
            this.frequencyWeight[
              relation
                .usage_frequency
              ]
            ?? 0;

          scores.set(

            department,

            (
              scores.get(
                department,
              )
              ?? 0
            )
            + weight,
          );

        },
      );

      return [

        ...scores.entries(),
      ]

        .map(
          (
            [
              department,
              score,
            ],
          ) => ({

            department,
            score,
          }),
        )

        .sort(
          (a, b) =>
            b.score
            - a.score,
        );
    });

  protected readonly chartData =
    computed<
      ChartConfiguration<'bar'>['data']
    >(() => ({

      labels:
        this
          .departmentData()
          .map(
            item =>
              item.department,
          ),

      datasets: [

        {
          data:
            this
              .departmentData()
              .map(
                item =>
                  item.score,
              ),

          borderRadius:
            10,

          borderSkipped:
            false,

          backgroundColor: [

            '#4f7cff',
            '#7c3aed',
            '#a855f7',
            '#ec4899',
            '#f97316',
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
