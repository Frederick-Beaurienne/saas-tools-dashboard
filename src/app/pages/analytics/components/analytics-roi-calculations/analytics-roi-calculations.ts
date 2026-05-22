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
    'app-analytics-roi-calculations',

  standalone:
    true,

  imports: [],

  templateUrl:
    './analytics-roi-calculations.html',

  styleUrl:
    './analytics-roi-calculations.scss',
})
export class AnalyticsRoiCalculations {

  readonly unusedToolsData =
    input<Tool[] | null>(
      null,
    );

  protected readonly potentialSavings =
    computed(() => {

      return (

        this
          .unusedToolsData()

        ?? []

      )

        .reduce(

          (
            total,
            tool,
          ) =>

            total
            +
            (
              tool.monthly_cost
              ?? 0
            ),

          0,
        );

    });

  protected readonly impactedLicenses =
    computed(() => {

      return (

        this
          .unusedToolsData()

        ?? []

      )

        .reduce(

          (
            total,
            tool,
          ) =>

            total
            +
            (
              tool.active_users_count
              ?? 0
            ),

          0,
        );

    });

}
