import {
  Component,
  inject,
  signal
} from '@angular/core';

import {LucideAngularModule} from 'lucide-angular';

import {Tool} from '../../shared/models/tool.model';

import {ToolsService} from '../../core/services/tools/tools.service';
import {ToolModal} from '../../shared/components/tool-modal/tool-modal';
import {AppIcons} from '../../shared/ui/icons';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [
    LucideAngularModule,
    ToolModal
  ],
  templateUrl: './tools.html'
})
export class Tools {

  protected readonly AppIcons = AppIcons;


  private readonly toolsService = inject(ToolsService);
  private readonly route = inject(ActivatedRoute);

  readonly tools =
    signal<Tool[]>([]);

  readonly selectedTool =
    signal<Tool | null>(null);

  readonly isModalOpen =
    signal(false);

  readonly isCreateMode =
    signal(false);

  constructor() {

    this.route
      .queryParamMap
      .subscribe(params => {

        const search =
          params.get('search')
          ?? '';

        this.loadTools(search);

      });

  }

  loadTools(search?: string): void {

    this.toolsService
      .getTools(search)
      .subscribe({

        next: response => {

          this.tools.set(
            response
          );

        },

        error:
        console.error

      });

  }

  openTool(
    tool: Tool
  ): void {

    this.selectedTool.set(tool);
    this.isCreateMode.set(false);
    this.isModalOpen.set(true);

  }

  createTool(): void {

    this.selectedTool.set(null);
    this.isCreateMode.set(true);
    this.isModalOpen.set(true);

  }

  closeModal(): void {

    this.isModalOpen.set(false);

  }

  requestRefresh(): void {

    const search =
      this.route
        .snapshot
        .queryParamMap
        .get('search')
      ?? '';

    this.loadTools(search);
  }

  displayValue(
    value: unknown
  ): string {

    return value
      ? String(value)
      : '—';

  }

  getStatusClasses(status: string): string {

    switch (status?.toLowerCase()) {

      case 'active':
        return 'bg-emerald-500/100 text-white';

      case 'unused':
        return 'bg-amber-500/100 text-white';

      case 'expiring':
        return 'bg-rose-500/100 text-white';

      default:
        return 'bg-[var(--surface-hover)] text-white/80';
    }
  }

  onImageError(
    event: Event,
    tool: Tool
  ): void {

    (
      event.target as HTMLImageElement
    ).style.display =
      'none';

    tool.icon_invalid =
      true;

  }

}
