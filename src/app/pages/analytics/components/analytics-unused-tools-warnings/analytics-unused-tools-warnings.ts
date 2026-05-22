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
    'app-analytics-unused-tools-warnings',

  standalone:
    true,

  imports: [],

  templateUrl:
    './analytics-unused-tools-warnings.html',

  styleUrl:
    './analytics-unused-tools-warnings.scss',
})
export class AnalyticsUnusedToolsWarnings {

  readonly unusedToolsData =
    input<Tool[] | null>(
      null,
    );

  protected readonly warnings =
    computed(() => {

      return [

        ...(this.unusedToolsData()
          ?? []),

      ]

        .sort(
          (a, b) =>

            (b.monthly_cost ?? 0)
            -
            (a.monthly_cost ?? 0),
        )

        .slice(
          0,
          3,
        );

    });

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
