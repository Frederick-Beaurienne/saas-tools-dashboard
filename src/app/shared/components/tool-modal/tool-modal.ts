import {
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  input,
  Output,
  signal
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';

import {ToolsService} from '../../../core/services/tools/tools.service';
import {ToolModalMode} from './tool-modal.types';
import {AppIcons} from '../../ui/icons';
import {Tool} from '../../../core/models/tool.model';
import {NgSelectComponent} from '@ng-select/ng-select';

@Component({
  selector: 'app-tool-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    NgSelectComponent
  ],
  templateUrl: './tool-modal.html',
  styleUrl: './tool-modal.scss'
})
export class ToolModal {

  private readonly fb = inject(FormBuilder);
  private readonly toolsService = inject(ToolsService);

  readonly departments = [
    'Engineering',
    'Sales',
    'Marketing',
    'HR',
    'Finance',
    'Operations',
    'Design',
    'Communication'
  ];

  readonly statuses = [
    'active',
    'unused',
    'expiring'
  ];

  readonly iconPreview =
    signal<string | null>(
      null
    );

  readonly Icons = AppIcons

  tool = input<any>();
  defaultMode = input<ToolModalMode>('view');
  availableModes = input<ToolModalMode[]>([
    'view',
    'edit',
    'delete'
  ]);

  @Output()
  closed = new EventEmitter<void>();

  @Output()
  changed = new EventEmitter<void>();

  currentMode = signal<ToolModalMode>('view');
  deleteConfirmation = signal(false);
  isSubmitting = signal(false);

  readonly form = this.fb.group({

    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]
    ],

    vendor: [
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ],

    category: [''],

    owner_department: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(Engineering|Sales|Marketing|HR|Finance|Operations|Design|Communication)$/
        )
      ]
    ],

    monthly_cost: [
      null,
      [
        Validators.required,
        Validators.min(0),
        Validators.pattern(
          /^\d+(\.\d{1,2})?$/
        )
      ]
    ],

    website_url: [
      '',
      [
        Validators.pattern(
          /^https?:\/\/.+/i
        )
      ]
    ],

    icon_url: [
      '',
      [
        Validators.pattern(
          /^(https?:\/\/.+)?$/i
        )
      ]
    ],

    description: [''],
    status: [
      'active',
      [
        Validators.required
      ]
    ],

    active_users_count: [null],

    updated_at: [''],

  });

  readonly isCreate = computed(() => !this.tool());

  constructor() {

    effect(() => {

      this.currentMode.set(
        this.isCreate()
          ? 'create'
          : this.defaultMode()
      );

      const tool = this.tool();

      if (tool) {
        this.form.patchValue(tool);
        this.iconPreview.set(
          tool?.icon_url ?? null
        );
      } else {
        this.form.reset({
          status: 'active'
        });
      }

    });

  }

  setMode(mode: ToolModalMode): void {

    if (!this.availableModes().includes(mode)) {
      return;
    }

    this.deleteConfirmation.set(false);
    this.currentMode.set(mode);

  }

  cancel(): void {

    this.deleteConfirmation.set(false);

    if (this.currentMode() === 'create') {

      this.close();
      return;

    }

    this.setMode('view');

  }

  close(): void {

    this.deleteConfirmation.set(false);
    this.closed.emit();

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

  updateIconPreview(): void {

    const value =
      this.form.value.icon_url;

    this.iconPreview.set(
      value?.trim()
        ? value
        : null
    );

  }

  toggleDeleteConfirmation(): void {

    this.deleteConfirmation.update(v => !v);

  }

  confirmDelete(): void {

    if (
      !this.tool()
      || !this.deleteConfirmation()
    ) {
      return;
    }

    this.toolsService
      .deleteTool(
        this.tool()!.id
      )
      .subscribe({

        next: () => {

          this.changed.emit();
          this.close();

        },

        error: console.error

      });

  }

  isInvalid(field: string): boolean {

    const control =
      this.form.get(field);

    return !!(
      control &&
      control.invalid &&
      (
        control.touched ||
        control.dirty
      )
    );

  }

  submit(): void {

    this.updateIconPreview();

    if (this.form.invalid) {

      this.form.markAllAsTouched();
      return;

    }

    const raw =
      this.form.getRawValue();

    const payload: Partial<Tool> = {

      name: raw.name ?? undefined,
      vendor: raw.vendor ?? undefined,
      category: raw.category ?? undefined,
      owner_department: raw.owner_department ?? undefined,
      monthly_cost: raw.monthly_cost ?? undefined,
      website_url: raw.website_url ?? undefined,
      icon_url: raw.icon_url ?? undefined,
      description: raw.description ?? undefined,
      status: raw.status as Tool['status'] ?? undefined

    };

    if (this.currentMode() === 'create') {

      this.toolsService
        .createTool(payload)
        .subscribe({

          next: () => {

            this.changed.emit();
            this.close();

          },

          error: console.error

        });

      return;

    }

    if (
      this.currentMode() === 'edit'
      && this.tool()
    ) {

      this.toolsService
        .updateTool(
          this.tool()!.id,
          payload
        )
        .subscribe({

          next: () => {

            this.changed.emit();
            this.close();

          },

          error: console.error

        });

    }

  }

}
