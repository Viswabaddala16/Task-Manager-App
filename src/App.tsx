import React, { useState } from 'react';
import AddTask from './components/AddTask';
import './index.css';
import TaskList from './components/TaskList';
import { Task } from './types/Task';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const handleAddTask = (newTask: Task) => {
    if (taskToEdit) {
      setTasks(tasks.map(task => task.id === newTask.id ? newTask : task));
      setTaskToEdit(null);
    } else {
      setTasks([...tasks, newTask]);
    }
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 gap-6">
      <div className="p-8 max-w-md w-full mx-auto bg-white rounded-xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 space-y-6">Task Manager</h1>
        <AddTask onAddTask={handleAddTask} taskToEdit={taskToEdit} />
        <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
      </div>
    </div>
  );
};

export default App;
