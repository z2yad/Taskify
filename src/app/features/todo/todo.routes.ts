import { Routes } from '@angular/router';
import { TodoList } from './todo-list/todo-list';
import { TodoNew } from './todo-new/todo-new';


export const todoRoutes: Routes = [
    {
        //evrery feature module has its own routes
        //الاجزاء الصغير الخاصه ب المودل يحتوي على روابطه الخاصه
        path: '',
        component: TodoList,
        pathMatch: 'full'
    },
    {
        path: 'new',
        component: TodoNew,
    }
];

