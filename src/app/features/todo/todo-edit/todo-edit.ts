import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '@/services/todo.service';
import { TodoForm } from '../todo-form/todo-form';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';

@Component({
  selector: 'app-todo-edit',
  standalone: true,
  imports: [TodoForm, ZardButtonComponent, ZardIconComponent],
  templateUrl: './todo-edit.html',
})
export class TodoEdit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private todoService = inject(TodoService);

  todo = signal(this.todoService.getById(this.route.snapshot.paramMap.get('id') ?? ''));

  goBack() {
    this.router.navigate(['/']);
  }
}
