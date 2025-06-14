import axios from "axios";
import Task from "./Task";

const API_BASE_URL = "http://localhost:3000/api/v1";

interface TaskType {
  _id: string;
  name: string;
  completed: boolean;
}

interface TasksProps {
  tasks: TaskType[];
  fetchTasks: () => void;
}

export default function Tasks({ tasks, fetchTasks }: TasksProps) {
  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (id: string, completed: boolean, name?: string) => {
    try {
      await axios.patch(`${API_BASE_URL}/tasks/${id}`, {
        completed: completed,
        name: name
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="w-full max-w-md">
      {tasks.map((task) => (
        <Task
          key={task._id}
          id={task._id}
          name={task.name}
          completed={task.completed}
          onDelete={deleteTask}
          onUpdate={updateTask}
        />
      ))}
    </div>
  );
}
