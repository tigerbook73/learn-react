import { createContext, useState, useContext, useReducer } from "react";

/**
 * type definitions
 */

interface Task {
  id: number;
  text: string;
  done: boolean;
}

type TaskAction =
  | {
      type: "added";
      id: number;
      text: string;
    }
  | {
      type: "changed";
      task: Task;
    }
  | {
      type: "deleted";
      id: number;
    }
  | {
      type: "string";
    };

/**
 * tasks reducer
 */
function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

/**
 * Tasks Context
 */
const TasksContext = createContext<Task[]>([]);
function useTasks() {
  return useContext(TasksContext);
}

/**
 * Tasks Dispatch Context
 */
const TasksDispatchContext = createContext<React.Dispatch<TaskAction> | null>(null);
function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

/**
 * TasksProvider
 */
function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>{children}</TasksDispatchContext>
    </TasksContext>
  );
}

function AddTask() {
  const [text, setText] = useState("");
  const dispatch = useTasksDispatch();

  return (
    <>
      <input placeholder="Add task" value={text} onChange={(e) => setText(e.target.value)} />
      <button
        className="m-3 px-2 py-1 bg-blue-500 text-white rounded"
        onClick={() => {
          setText("");
          if (dispatch && text.trim() !== "") {
            dispatch({
              type: "added",
              id: nextId++,
              text: text,
            });
          }
        }}
      >
        Add
      </button>
    </>
  );
}

let nextId = 3;

const initialTasks = [
  { id: 0, text: "Philosopher’s Path", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink matcha", done: false },
];

function TaskList() {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  if (!dispatch) {
    throw new Error("Task component must be used within a TasksProvider");
  }
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            dispatch({
              type: "changed",
              task: {
                ...task,
                text: e.target.value,
              },
            });
          }}
        />
        <button className="m-2 bg-blue-500 text-white rounded" onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button className="m-2 bg-blue-500 text-white rounded" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          dispatch({
            type: "changed",
            task: {
              ...task,
              done: e.target.checked,
            },
          });
        }}
      />
      {taskContent}
      <button
        className="m-2 bg-red-500 text-white rounded"
        onClick={() => {
          dispatch({
            type: "deleted",
            id: task.id,
          });
        }}
      >
        Delete
      </button>
    </label>
  );
}

export default function TaskApp() {
  return (
    <TasksProvider>
      <div>
        <h1>Day off in Kyoto</h1>
        <AddTask />
        <TaskList />
      </div>
    </TasksProvider>
  );
}
