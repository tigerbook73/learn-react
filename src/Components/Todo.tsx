import { Button } from "@mui/material";
import { useReducer, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}

export default function Test() {
  return (
    <ErrorBoundary
      fallbackRender={ErrorFallback}
      onError={(error, info) => {
        console.error("Error caught by ErrorBoundary:", error);
        console.error("Error info:", info);
      }}
      onReset={() => {
        console.log("ErrorBoundary reset");
      }}
    >
      <TaskList />
    </ErrorBoundary>
  );
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

type TaskAction =
  | { type: "add"; title: string }
  | { type: "update"; id: number; title: string }
  | { type: "delete"; id: number }
  | { type: "toggle"; id: number };

function taskReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "add":
      return [...tasks, { id: tasks.length + 1, title: action.title, completed: false }];
    case "update":
      return tasks.map((task) => (task.id === action.id ? { ...task, title: action.title } : task));
    case "delete":
      return tasks.filter((task) => task.id !== action.id);
    case "toggle":
      return tasks.map((task) => (task.id === action.id ? { ...task, completed: !task.completed } : task));
    default:
      return tasks;
  }
}

function TaskList() {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <div className="p-4 border rounded shadow-lg">
      <h2>Task List</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} action={dispatch} />
      ))}
      <NewTask action={dispatch} />
    </div>
  );
}

function Task({ task, action }: { task: Task; action: React.Dispatch<TaskAction> }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
    setNewTitle(task.title);
  }

  function handleSave() {
    if (newTitle.trim()) {
      action({ type: "update", id: task.id, title: newTitle });
      setIsEditing(false);
    }
  }

  function handleDelete() {
    action({ type: "delete", id: task.id });
  }

  function handleToggle() {
    action({ type: "toggle", id: task.id });
  }

  return (
    <div>
      <input type="checkbox" checked={task.completed} onChange={handleToggle} />
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          className="m-1 p-1 w-80 border rounded"
          onChange={(e) => setNewTitle(e.target.value)}
        />
      ) : (
        <>
          <span className="m-1 p-1 inline-block w-80 ">{task.title}</span>
          <Button variant="contained" onClick={handleEdit}>
            Edit
          </Button>
        </>
      )}

      {!isEditing && (
        <Button variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      )}
      {isEditing && (
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      )}
      {isEditing && (
        <Button variant="contained" onClick={handleCancel}>
          Cancel
        </Button>
      )}
    </div>
  );
}

function NewTask({ action }: { action: React.Dispatch<TaskAction> }) {
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      action({ type: "add", title });
      setTitle("");
      inputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task title"
        className="m-1 p-1 w-83 border-1 rounded"
        ref={inputRef}
      />
      <Button variant="contained" type="submit">
        Add Task
      </Button>
    </form>
  );
}
