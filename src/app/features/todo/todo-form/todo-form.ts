import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PREDEFINED_CATEGORIES } from '@/interfaces/category';
import { ZardIconComponent, type ZardIcon } from "@/shared/components/icon";
import { ZardSelectImports } from "@/shared/components/select";
import { ZardInputDirective } from "@/shared/components/input";
import { ZardButtonComponent } from "@/shared/components/button";
import { TitleCasePipe } from '@angular/common';
import { TodoService } from '@/services/todo';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ZardButtonComponent,
    ZardIconComponent,
    ZardInputDirective,
    ZardSelectImports,
    TitleCasePipe
  ],
  templateUrl: './todo-form.html',
})
export class TodoForm {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private todoService = inject(TodoService);
  todoForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(100)]],
    description: ['', [ Validators.minLength(3),Validators.maxLength(500)]],
    category: [''],
    priority: ['']
  });
  onSubmit() {
    //console.log(this.todoForm.invalid);
    const formvalue = this.todoForm.value;
    //console.log(formvalue);
    this.todoService.add({
      title:formvalue.title as string,
      description:formvalue.description ,
      category:formvalue.category as string,
    });

  }

  categories = signal(Object.keys(PREDEFINED_CATEGORIES));
  priorities = signal(['low', 'medium', 'high']);

  getIcon(name: string): ZardIcon {
    if (PREDEFINED_CATEGORIES[name]) {
      return PREDEFINED_CATEGORIES[name].icon as ZardIcon;
    }

    // Fallback for priorities
    switch (name.toLowerCase()) {
      case 'low': return 'chevron-down';
      case 'medium': return 'minus';
      case 'high': return 'arrow-up';
      default: return 'tag';
    }
  }

  saveTodo() {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    }

    const value = this.todoForm.value;
    const newTodo = {
      ...value,
      completed: false,
      createdAt: new Date()
    };

    console.log('Saving Todo:', newTodo);
    // In a real app, we would call a service here
    this.router.navigate(['/']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
