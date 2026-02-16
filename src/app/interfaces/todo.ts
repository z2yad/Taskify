export interface Todo {
    id: string;
    title: string;
    description?: string;
    category?: string;
    priority: Priority;
    completed: boolean;
    createdAt: string;
    order: number;
}
export type Priority = 'low' | 'medium' | 'high';
