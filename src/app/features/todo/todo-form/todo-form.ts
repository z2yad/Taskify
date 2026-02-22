import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PREDEFINED_CATEGORIES } from '@/interfaces/category';
import { ZardIconComponent, type ZardIcon } from "@/shared/components/icon";
import { ZardSelectImports } from "@/shared/components/select";
import { ZardInputDirective } from "@/shared/components/input";
import { ZardButtonComponent } from "@/shared/components/button";
import { TodoService } from '@/services/todo.service';
import { toast } from 'ngx-sonner';
import { Todo } from '@/interfaces/todo';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ZardButtonComponent,
    ZardIconComponent,
    ZardInputDirective,
    ZardSelectImports
  ],
  templateUrl: './todo-form.html',
})
export class TodoForm {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private todoService = inject(TodoService);

  isEdit = input<boolean>(false);
  todoInitialData = input<Todo | undefined>(undefined);

  todoForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    description: ['', [Validators.minLength(3), Validators.maxLength(500)]],
    category: [''],
    priority: ['']
  });

  constructor() {
    effect(() => {
      const data = this.todoInitialData();
      if (data) {
        this.todoForm.patchValue({
          title: data.title,
          description: data.description,
          category: data.category,
          priority: data.priority
        });
      }
    });
  }

  onSubmit() {
    if (this.todoForm.invalid) {
      this.showToastError();
      return;
    }

    const formvalue = this.todoForm.value;
    const payload = {
      title: formvalue.title as string,
      description: formvalue.description as string,
      category: formvalue.category as string,
      priority: formvalue.priority as any,
    };

    if (this.isEdit() && this.todoInitialData()) {
      this.todoService.update(this.todoInitialData()!.id, payload);
      toast.success('Task updated successfully!');
    } else {
      this.todoService.add(payload);
      toast.success('Task created successfully!');
    }

    this.router.navigateByUrl('/todo');
  }

  showToastError() {
    toast.error('Title is required and must be between 3-100 characters');
  }

  get title() {
    return this.todoForm.get('title')?.value;
  }

  categories = signal(Object.keys(PREDEFINED_CATEGORIES));
  priorities = signal(['low', 'medium', 'high']);

  getIcon(name: string): ZardIcon {
    if (PREDEFINED_CATEGORIES[name]) {
      return PREDEFINED_CATEGORIES[name].icon as ZardIcon;
    }

    switch (name.toLowerCase()) {
      case 'low': return 'chevron-down';
      case 'medium': return 'minus';
      case 'high': return 'arrow-up';
      default: return 'tag';
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
