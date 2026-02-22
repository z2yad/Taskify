import { Component, inject, input, output } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo';
import { DatePipe } from '@angular/common';
import { TodoService } from '../../../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  imports: [DatePipe],
  templateUrl: './todo-item.html',
})
export class TodoItem {
  todo = input.required<Todo>();
  isSelected = input<boolean>(false);
  remove = output<string>();
  selectToggle = output<boolean>();
  TodoService = inject(TodoService);
  router = inject(Router);

  onRemove(): void {
    this.remove.emit(this.todo().id);
  }

  onSelectToggle(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.selectToggle.emit(checkbox.checked);
  }

  toggleCompletion(): void {
    this.TodoService.toggleCompletion(this.todo().id);
  }

  getPriorityClasses(): string {
    const priority = this.todo().priority;
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-600 border-red-200/60';
      case 'medium': return 'bg-amber-50 text-amber-600 border-amber-200/60';
      case 'low': return 'bg-indigo-50 text-indigo-600 border-indigo-200/60';
      default: return 'bg-slate-50 text-slate-600 border-slate-200/60';
    }
  }

  getCategoryColor(): string {
    const category = this.todo().category?.toLowerCase();
    if (category === 'work') return 'text-indigo-600';
    if (category === 'personal') return 'text-rose-600';
    return 'text-amber-600';
  }

  editTodo(id: string): void {
    //this.router.navigateByUrl(`/todo/edit/${id}`);
    // دى طريقه افضل علشان نتعامل مع التايب سكربت
    this.router.navigate(['todo','edit',id])
  }
}
