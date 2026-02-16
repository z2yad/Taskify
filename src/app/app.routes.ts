import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/todo',
        // redirectTo: '/todos',
        pathMatch: 'full' //complete matching =>user=>/does not match //todos=>redirect to todos
    },
    {
        path: 'todo',
        //lazy loading
        loadChildren: () => import('./features/todo').then((m) => m.todoRoutes)
    }
];
