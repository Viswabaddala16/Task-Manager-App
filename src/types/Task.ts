import { Dayjs } from 'dayjs'; 
export interface Task {
    id?: number;
    title: string;
    description: string;
    dueDate: Dayjs | undefined; // Updated to use Dayjs
    priority: 'low' | 'medium' | 'high';
    status: 'in-progress' | 'completed';
}
  