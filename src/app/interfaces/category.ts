export interface Categoryconfig {
    name: string;
    icon: string;
    color: string;
    iscustom: boolean;
}
export const PREDEFINED_CATEGORIES: Record<string, Categoryconfig> = {
    Work: {
        name: 'Work',
        icon: 'monitor',
        color: 'text-blue-600 bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
        iscustom: false
    },
    Personal: {
        name: 'Personal',
        icon: 'user',
        color: 'text-green-600 bg-green-200 dark:bg-green-900/30 dark:text-green-300',
        iscustom: false
    },
    Shopping: {
        name: 'Shopping',
        icon: 'credit-card',
        color: 'text-orange-600 bg-orange-200 dark:bg-orange-90096/30 dark:text-orange-300',
        iscustom: false
    },
    Health: {
        name: 'Health',
        icon: 'heart',
        color: 'text-teal-600 bg-teal-200 dark:bg-teal-900/30 dark:text-teal-300',
        iscustom: false
    },
    Finance: {
        name: 'Finance',
        icon: 'dollar-sign',
        color: 'text-red-600 bg-red-200 dark:bg-red-900/30 dark:text-red-300',
        iscustom: false
    },
    Education: {
        name: 'Education',
        icon: 'book-open',
        color: 'text-purple-600 bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300',
        iscustom: false
    }
}