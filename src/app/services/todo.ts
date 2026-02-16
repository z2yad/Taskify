
import { Todo } from '@/interfaces/todo';
import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos = signal<Todo[]>([]);//for the  Future, load the todos form the localstorage or from the backend
  total = computed(()=>(this.todos().length));
  add(payload: Partial<Todo>) {
    const {title, description} = payload;
    const newTodo:Todo = {
      ...payload,
      id: this.generateId(),
      title:title ||'',
      description,
      completed: false,
      createdAt: new Date().toISOString(),
      order: 1,
      priority:'low',
      category:'work'
    }
    //make update to the signal
    this.todos.update(prevTodos => [...prevTodos, newTodo]);
  }

  private generateId(): string {
    // Use native randomUUID if available, otherwise fall back to UUIDv4 via getRandomValues
    const native = (globalThis as any).crypto;
    if (native && typeof (native as any).randomUUID === 'function') {
      return (native as any).randomUUID();
    }
    const bytes = (native ?? ({} as Crypto)).getRandomValues?.(new Uint8Array(16)) ?? new Uint8Array(16);
    const byteArray = bytes as Uint8Array;
    byteArray[6] = (byteArray[6] & 0x0f) | 0x40;
    byteArray[8] = (byteArray[8] & 0x3f) | 0x80;
    const hex = Array.from(byteArray).map(b => b.toString(16).padStart(2, '0')).join('');
    return `${hex.substring(0,8)}-${hex.substring(8,12)}-${hex.substring(12,16)}-${hex.substring(16,20)}-${hex.substring(20)}`;
  }
    // ...existing code...
}
