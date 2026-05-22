import {
  Component,
  computed,
  input,
} from '@angular/core';

import {
  NgStyle,
} from '@angular/common';

import {
  Tool,
} from '../../../../core/models/tool.model';

import {
  UserTool,
} from '../../../../core/models/user-tool.model';

@Component({
  selector:
    'app-analytics-most-least-used-tools',

  standalone: true,

  imports: [
    NgStyle,
  ],

  templateUrl:
    './analytics-most-least-used-tools.html',

  styleUrl:
    './analytics-most-least-used-tools.scss',
})
export class AnalyticsMostLeastUsedTools {

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

  protected readonly usageRanking =
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
        );

    });

  protected readonly maxScore =
    computed(() => {

      return this
          .usageRanking()[0]
          ?.score
        ?? 1;

    });

  protected readonly mostUsed =
    computed(() =>

      this
        .usageRanking()
        .slice(
          0,
          3,
        ),
    );

  protected readonly leastUsed =
    computed(() =>

      [...this.usageRanking()]

        .reverse()

        .slice(
          0,
          3,
        ),
    );

  protected barWidth(
    score: number,
  ): number {

    return (
        score
        / this.maxScore()
      )
      * 100;

  }
}
