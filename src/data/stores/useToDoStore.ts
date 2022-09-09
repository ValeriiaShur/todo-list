import create from 'zustand';
import { generateId } from '../helpers';

interface Task {
    id: string;
    title: string;
    createdAt: number;
};

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
};

export const useToDoStore = create<ToDoStore>((set, get) => ({
    tasks: [
        {
            id: 'kjsbnd78sd',
            title: 'Wash dishes',
            createdAt: 1234
        },
        {
            id: 'sdfsdf23324',
            title: 'Clean up in the living room',
            createdAt: 1234
        }
    ],
    createTask: (title: string) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now(),
        };

        set({
            tasks:  [newTask, ...tasks],
        })
    },
    updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title,
            }))
        });
    },
    removeTask: (id: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter((task) => task.id !== id)
        });
    },
}));