import { Component } from '@angular/core';
import { ZardButtonComponent } from "@/shared/components/button";
import { ZardIconComponent } from "@/shared/components/icon";
import { Router } from '@angular/router';
import { TodoForm } from '../todo-form/todo-form';

@Component({
  selector: 'app-todo-new',
  standalone: true,
  imports: [
    ZardButtonComponent,
    ZardIconComponent,
    TodoForm
  ],
  templateUrl: './todo-new.html',
})
export class TodoNew {
  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/']);
  }
}