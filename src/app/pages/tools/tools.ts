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
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [
    LucideAngularModule,
    ToolModal,
    DatePipe
  ],
  templateUrl: './tools.html'
})
export class Tools {

  protected readonly AppIcons = AppIcons;
  protected readonly Math = Math;

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

  readonly sortField =
    signal<string | null>(
      null
    );

  readonly sortOrder =
    signal<'asc' | 'desc'>(
      'asc'
    );

  readonly page =
    signal(1);

  readonly pageSize =
    signal(10);

  readonly total =
    signal(0);

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
      .getTools(
        search,
        this.sortField()
        ?? undefined,
        this.sortOrder(),
        this.page(),
        this.pageSize()
      )
      .subscribe({

        next: response => {

          this.tools.set(
            response.data
          );

          this.total.set(
            response.total
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

  toggleSort(
    field: string
  ): void {

    if (
      this.sortField()
      === field
    ) {

      this.sortOrder.set(
        this.sortOrder()
        === 'asc'
          ? 'desc'
          : 'asc'
      );

    } else {

      this.sortField.set(
        field
      );

      this.sortOrder.set(
        'asc'
      );

    }

    const search =
      this.route
        .snapshot
        .queryParamMap
        .get('search')
      ?? '';

    this.page.set(1);

    this.loadTools(
      search
    );

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

  pages(): number[] {

    const count =
      Math.ceil(
        this.total()
        / this.pageSize()
      );

    return Array.from(
      {length: count},
      (_, i) => i + 1
    );

  }

  goToPage(
    page: number
  ): void {

    if (
      page
      === this.page()
    ) {

      return;

    }

    this.page.set(
      page
    );

    const search =
      this.route
        .snapshot
        .queryParamMap
        .get('search')
      ?? '';

    this.loadTools(
      search
    );

  }

  prevPage(): void {

    if (
      this.page()
      <= 1
    ) {

      return;

    }

    this.goToPage(
      this.page() - 1
    );

  }

  nextPage(): void {

    if (
      this.page()
      >= this.pages().length
    ) {

      return;

    }

    this.goToPage(
      this.page() + 1
    );

  }

  firstPage(): void {

    if (
      this.page()
      === 1
    ) {

      return;

    }

    this.goToPage(1);

  }

  lastPage(): void {

    const last =
      this.pages().length;

    if (
      this.page()
      === last
    ) {

      return;

    }

    this.goToPage(last);

  }
}
