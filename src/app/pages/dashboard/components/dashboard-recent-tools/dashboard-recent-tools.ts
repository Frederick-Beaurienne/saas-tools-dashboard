import {Component, EventEmitter, Output, signal} from '@angular/core';
import {input} from '@angular/core';
import {Tool} from '../../../../shared/models/tool.model';
import {AppIcons} from '../../../../shared/ui/icons';
import {LucideAngularModule} from 'lucide-angular';
import {ToolModal} from '../../../../shared/components/tool-modal/tool-modal';

@Component({
  selector: 'app-dashboard-recent-tools',
  imports: [LucideAngularModule,
    ToolModal],
  templateUrl: './dashboard-recent-tools.html',
  styleUrl: './dashboard-recent-tools.scss',
})
export class DashboardRecentTools {

  @Output()
  refreshRequested = new EventEmitter<void>();

  tools = input.required<Tool[]>();

  selectedTool = signal<any | null>(null);
  isModalOpen = signal(false);

  protected readonly AppIcons = AppIcons;

  onImageError(event: Event, tool: Tool): void {

    const img = event.target as HTMLImageElement;

    if (tool.icon_invalid) {
      return;
    }

    tool.icon_invalid = true;
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

  displayValue(value: unknown): string {

    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return '—';
    }

    return String(value);
  }

  openTool(tool: any): void {

    this.selectedTool.set(tool);
    this.isModalOpen.set(true);

  }

  closeModal(): void {

    this.isModalOpen.set(false);
    this.selectedTool.set(null);

  }

  requestRefresh(): void {

    this.refreshRequested.emit();

  }
}
