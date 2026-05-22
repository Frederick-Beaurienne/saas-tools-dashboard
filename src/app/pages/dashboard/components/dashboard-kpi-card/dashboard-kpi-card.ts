import {Component} from '@angular/core';
import {LucideAngularModule, LucideIconData} from 'lucide-angular';
import {AppIcons} from '../../../../shared/ui/icons';
import {input} from '@angular/core';
import {NgStyle} from '@angular/common';
import {Tool} from '../../../../core/models/tool.model';

@Component({
  selector: 'app-dashboard-kpi-card',
  standalone: true,
  imports: [
    LucideAngularModule,
    NgStyle,
  ],
  templateUrl: './dashboard-kpi-card.html',
  styleUrl: './dashboard-kpi-card.scss',
})
export class DashboardKpiCard {
  protected readonly Icons = AppIcons;

  title = input.required<string>();
  value = input.required<string>();
  secondaryValue = input<string>();
  trend = input.required<string>();
  icon = input.required<LucideIconData>();
  accentFrom = input.required<string>();
  accentTo = input.required<string>();

  recentTools: Tool[] = [];
}
