import { Component, signal } from '@angular/core';
import { ZardButtonComponent } from "@/shared/components/button";
import { RouterLink } from "@angular/router";
import { ZardInputDirective } from "@/shared/components/input";
import { PREDEFINED_CATEGORIES } from '@/interfaces/category';
import { ZardIconComponent, type ZardIcon } from "@/shared/components/icon";
@Component({
  selector: 'app-todo-list',
  imports: [ZardButtonComponent, RouterLink, ZardInputDirective, ZardIconComponent],
  templateUrl: './todo-list.html',
})
export class TodoList {
  predefinedCategories = signal(Object.keys(PREDEFINED_CATEGORIES));
  predefinedcategory = PREDEFINED_CATEGORIES;
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
}
