import {LucideIconData} from 'lucide-angular';

export interface KpiCard {
  title: string;
  value: string;
  secondaryValue?: string;
  trend: string;
  icon: LucideIconData;
  accentFrom: string;
  accentTo: string;
}
