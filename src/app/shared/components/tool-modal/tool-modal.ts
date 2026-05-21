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
import {Tool} from '../../models/tool.model';
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

    description: [''],
    status: ['active']

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
