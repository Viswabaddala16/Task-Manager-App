import React, { useState } from 'react';
import { List, Button, Input, Select } from 'antd';
import { Task } from '../types/Task';

const TaskList: React.FC<{ tasks: Task[], onEdit: (task: Task) => void, onDelete: (id: number) => void }> = ({ tasks, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const filteredTasks = tasks
    .filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(task => (filterPriority ? task.priority === filterPriority : true))
    .filter(task => (filterStatus ? task.status === filterStatus : true));

  return (
    <div className="space-y-4">
      <Input 
        placeholder="Search tasks..." 
        className="mb-2 p-2 w-full border border-gray-300 bg-white" 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <Select 
        className="p-2 w-full mb-2 bg-white" 
        placeholder="Filter by priority" 
        onChange={(value) => setFilterPriority(value)}
      >
        <Select.Option value="low">Low</Select.Option>
        <Select.Option value="medium">Medium</Select.Option>
        <Select.Option value="high">High</Select.Option>
      </Select>
      <Select 
        className="p-2 w-full mb-2 bg-white" 
        placeholder="Filter by status" 
        onChange={(value) => setFilterStatus(value)}
      >
        <Select.Option value="in-progress">In Progress</Select.Option>
        <Select.Option value="completed">Completed</Select.Option>
      </Select>
      <List
        itemLayout="horizontal"
        dataSource={filteredTasks}
        renderItem={task => (
          <List.Item
            actions={[
              <Button onClick={() => onEdit(task)} className="bg-blue-500 text-white">Edit</Button>,
              <Button danger onClick={() => task.id && onDelete(task.id)} className="text-red-500">Delete</Button>
            ]}
          >
            <List.Item.Meta
              title={task.title}
              description={`${task.description} - Due: ${task.dueDate ? task.dueDate.format('MM/DD/YYYY') : 'No Due Date'} - Priority: ${task.priority}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default TaskList;
