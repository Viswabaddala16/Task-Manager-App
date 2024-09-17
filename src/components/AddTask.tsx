import React, { useState, useEffect } from 'react';
import { Button, Input, DatePicker, Select } from 'antd';
import { Task } from '../types/Task';
import dayjs, { Dayjs } from 'dayjs';

const AddTask: React.FC<{ onAddTask: (task: Task) => void, taskToEdit?: Task | null }> = ({ onAddTask, taskToEdit }) => {
  const [task, setTask] = useState<Partial<Task>>({});

  useEffect(() => {
    if (taskToEdit) {
      setTask({
        ...taskToEdit,
        dueDate: taskToEdit.dueDate ? dayjs(taskToEdit.dueDate) : undefined,
      });
    }
  }, [taskToEdit]);

  const handleAdd = () => {
    if (task.title && task.description && task.dueDate && task.priority && task.status) {
      const dueDateValid = dayjs(task.dueDate as Dayjs).isValid();
      if (dueDateValid) {
        onAddTask({ ...task, id: task.id || Date.now() } as Task);
        setTask({});
      } else {
        console.error('Invalid dueDate');
      }
    } else {
      console.error('Missing required fields');
    }
  };

  return (
    <div className="space-y-6">
      <Input
        className="p-6 border border-gray-300 rounded-lg mb-6 "
        placeholder="Title checking open  "
        value={task.title || ''}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <Input
        className="p-2 border border-gray-300 rounded-lg w-full mb-6"
        placeholder="Description"
        value={task.description || ''}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <DatePicker
        className="p-2 border border-gray-300 rounded-lg w-full mb-6 "
        value={task.dueDate ? dayjs(task.dueDate) : null}
        onChange={(date) => setTask({ ...task, dueDate: date || undefined })}
      />
      <Select
        className="p-2 border border-gray-300 rounded-lg w-full mb-6"
        placeholder="Select Priority"
        value={task.priority || undefined}
        onChange={(value) => setTask({ ...task, priority: value as 'low' | 'medium' | 'high' })}
      >
        <Select.Option value="low">Low</Select.Option>
        <Select.Option value="medium">Medium</Select.Option>
        <Select.Option value="high">High</Select.Option>
      </Select>
      <Select
        className="p-2 border border-gray-300 rounded-lg w-full mb-6" 
        placeholder="Select Status"
        value={task.status || undefined}
        onChange={(value) => setTask({ ...task, status: value as 'in-progress' | 'completed' })}
      >
        <Select.Option value="in-progress">In Progress</Select.Option>
        <Select.Option value="completed">Completed</Select.Option>
      </Select>
      <Button 
        className="bg-blue-600 text-white rounded-lg p-2 w-full hover:bg-blue-700" 
        onClick={handleAdd}
      >
        {taskToEdit ? "Update Task" : "Add Task"}
      </Button>
    </div>
  );
};

export default AddTask;
