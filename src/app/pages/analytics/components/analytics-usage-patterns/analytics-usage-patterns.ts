import {
  Component,
  computed,
  input,
} from '@angular/core';

import {
  NgStyle,
} from '@angular/common';

import {
  UserTool,
} from '../../../../core/models/user-tool.model';

@Component({
  selector:
    'app-analytics-usage-patterns',

  standalone:
    true,

  imports: [
    NgStyle,
  ],

  templateUrl:
    './analytics-usage-patterns.html',

  styleUrl:
    './analytics-usage-patterns.scss',
})
export class AnalyticsUsagePatterns {

  readonly userToolsData =
    input<UserTool[] | null>(
      null,
    );

  protected readonly patterns =
    computed(() => {

      const userTools =
        this.userToolsData()
        ?? [];

      const counts = {

        daily:
          0,

        weekly:
          0,

        monthly:
          0,

        rarely:
          0,
      };

      userTools.forEach(
        relation => {

          const key =
            relation
              .usage_frequency
              ?.toLowerCase();

          if (

            key
            in counts

          ) {

            counts[
              key as keyof typeof counts
              ]++;

          }

        },
      );

      return [

        {
          label:
            'Daily',

          value:
          counts.daily,
        },

        {
          label:
            'Weekly',

          value:
          counts.weekly,
        },

        {
          label:
            'Monthly',

          value:
          counts.monthly,
        },

        {
          label:
            'Rarely',

          value:
          counts.rarely,
        },
      ];

    });

  protected readonly maxValue =
    computed(() => {

      return Math.max(
        ...this
          .patterns()
          .map(
            item =>
              item.value,
          ),

        1,
      );

    });

  protected barWidth(
    value: number,
  ): number {

    return (
        value
        / this.maxValue()
      )
      * 100;

  }
}
