export interface Tool {
  id: number;
  name: string;
  description: string;
  vendor: string;
  category: string;
  monthly_cost: number;
  previous_month_cost: number;
  owner_department: string;
  status: 'active' | 'unused' | 'expiring';
  website_url: string;
  active_users_count: number;
  icon_url: string;
  icon_invalid: boolean;
  created_at: string;
  updated_at: string;
}
