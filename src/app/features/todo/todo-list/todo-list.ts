import { Component, computed, inject, signal } from '@angular/core';
import { ZardButtonComponent } from "@/shared/components/button";
import { RouterLink } from "@angular/router";
import { ZardInputDirective } from "@/shared/components/input";
import { PREDEFINED_CATEGORIES } from '@/interfaces/category';
import { ZardIconComponent, type ZardIcon } from "@/shared/components/icon";
import { TodoService } from '../../../services/todo.service';
import { toast } from 'ngx-sonner';
import { TodoItem } from '../todo-item/todo-item';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-list',
  imports: [ZardButtonComponent, RouterLink, ZardInputDirective, ZardIconComponent, TodoItem, CdkDrag],
  templateUrl: './todo-list.html',
})
export class TodoList {
  predefinedCategories = signal(Object.keys(PREDEFINED_CATEGORIES));
  predefinedcategory = PREDEFINED_CATEGORIES;
  TodoService = inject(TodoService);
  todoselected = signal<Set<string>>(new Set());

  // Computed signal for "Select All" state
  isAllSelected = computed(() => {
    const todos = this.TodoService.todos();
    const selected = this.todoselected();
    return todos.length > 0 && todos.every(todo => selected.has(todo.id));
  });

  // Computed signal for selection count text
  selectionCountText = computed(() => {
    const count = this.todoselected().size;
    return `${count} selected`;
  });

  getIcon(icon: string): ZardIcon {
    return icon as ZardIcon;
  }
  getCategoryIcon(name: string) {
    if (PREDEFINED_CATEGORIES[name])
      return PREDEFINED_CATEGORIES[name]
    return {
      name: name,
      icon: 'hash',
      color: '',
      isCustomIcon: true
    }
  }
  onRemove(id: string): void {
    this.TodoService.remove(id);
    // Remove from selected as well if it was there
    this.onItemSelect(id, false);
  }

  onItemSelect(id: string, isSelected: boolean): void {
    this.todoselected.update(set => {
      const newSet = new Set(set);
      if (isSelected) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  }

  toggleSelectAll(checked: boolean): void {
    if (checked) {
      const allIds = this.TodoService.todos().map(t => t.id);
      this.todoselected.set(new Set(allIds));
    } else {
      this.todoselected.set(new Set());
    }
  }

  bulkdelete(): void {
    const selectedIds = Array.from(this.todoselected());
    if (selectedIds.length === 0) return;

    selectedIds.forEach(id => this.TodoService.remove(id));
    this.todoselected.set(new Set());
    toast.success(`Successfully deleted ${selectedIds.length} items`);
  }

  bulkComplete(): void {
    const selectedIds = Array.from(this.todoselected());
    if (selectedIds.length === 0) return;

    selectedIds.forEach(id => {
      const todo = this.TodoService.getById(id);
      if (todo && !todo.completed) {
        this.TodoService.toggleCompletion(id);
      }
    });
    this.todoselected.set(new Set());
    toast.success(`Successfully completed ${selectedIds.length} items`);
  }

  cancelSelection(): void {
    this.todoselected.set(new Set());
  }
  /*filterTodos(category: string): void {
    this.TodoService.filter(category);
  }*/
  selectedCategory = signal<string | null>(null);
  selectedStatus = signal<'all' | 'active' | 'completed'>('all');
  searchQuery = signal<string>('');

  filteredTodos = computed(() => {
    const todos = this.TodoService.todos();
    const category = this.selectedCategory();
    const status = this.selectedStatus();
    const search = this.searchQuery().toLowerCase().trim();

    return todos.filter(todo => {
      const matchesCategory = !category || todo.category === category;
      const matchesStatus = !status || status === 'all' ||
        (status === 'active' && !todo.completed) ||
        (status === 'completed' && todo.completed);
      const matchesSearch = !search ||
        todo.title.toLowerCase().includes(search) ||
        (todo.description?.toLowerCase().includes(search) ?? false);

      return matchesCategory && matchesStatus && matchesSearch;
    });
  });
}
