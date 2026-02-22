import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  linkedSignal,
  AfterContentInit,
  signal,
} from '@angular/core';

import { ZardIconComponent } from '@/shared/components/icon';
import {
  selectItemIconVariants,
  selectItemVariants,
  type ZardSelectItemModeVariants,
  type ZardSelectSizeVariants,
} from '@/shared/components/select/select.variants';
import { mergeClasses, noopFn, transform } from '@/shared/utils/merge-classes';

// Interface to avoid circular dependency
interface SelectHost {
  selectedValue(): string[];
  selectItem(value: string, label: string): void;
  navigateTo(): void;
}

@Component({
  selector: 'z-select-item, [z-select-item]',
  imports: [ZardIconComponent],
  template: `
    @if (isSelected()) {
      <span [class]="iconClasses()">
        <z-icon zType="check" [zStrokeWidth]="strokeWidth()" aria-hidden="true" data-testid="check-icon" />
      </span>
    }
    <span class="truncate">
      <ng-content />
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'option',
    tabindex: '-1',
    '[class]': 'classes()',
    '[attr.value]': 'zValue()',
    '[attr.data-disabled]': 'zDisabled() ? "" : null',
    '[attr.data-selected]': 'isSelected() ? "" : null',
    '[attr.aria-selected]': 'isSelected()',
    '(click)': 'onClick()',
    '(mouseenter)': 'onMouseEnter()',
    '(keydown.{tab}.prevent)': 'noopFn',
  },
})
export class ZardSelectItemComponent implements AfterContentInit {
  readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly zValue = input.required<string>();
  readonly zDisabled = input(false, { transform });
  readonly class = input<string>('');

  readonly label = signal<string>('');

  ngAfterContentInit() {
    this.updateLabel();
  }

  updateLabel() {
    // Small delay to ensure text is rendered (especially for @for loops)
    setTimeout(() => {
      const element = this.elementRef.nativeElement;
      const contentPart = element.querySelector('.truncate');
      const text = (contentPart?.textContent ?? element.textContent ?? '').trim();
      // Use the captured text, or fall back to the zValue itself
      this.label.set(text || this.zValue());
    }, 0);
  }
  

  private readonly select = signal<SelectHost | null>(null);
  noopFn = noopFn;

  readonly zMode = signal<ZardSelectItemModeVariants>('normal');
  readonly zSize = signal<ZardSelectSizeVariants>('default');

  protected readonly classes = computed(() =>
    mergeClasses(selectItemVariants({ zMode: this.zMode(), zSize: this.zSize() }), this.class()),
  );

  protected readonly iconClasses = computed(() =>
    mergeClasses(selectItemIconVariants({ zMode: this.zMode(), zSize: this.zSize() })),
  );

  protected readonly strokeWidth = computed(() => (this.zMode() === 'compact' ? 3 : 2));

  protected readonly isSelected = computed(() => this.select()?.selectedValue().includes(this.zValue()) ?? false);

  setSelectHost(selectHost: SelectHost) {
    this.select.set(selectHost);
  }

  onMouseEnter() {
    if (this.zDisabled()) {
      return;
    }
    this.select()?.navigateTo();
  }

  onClick() {
    if (this.zDisabled()) {
      return;
    }
    this.select()?.selectItem(this.zValue(), this.label());
  }
}
