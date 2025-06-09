import ContextExample from "./Components/ContextExample";
import Todo from "./Components/Todo";

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="m-2 p-2 border-2 rounded-lg shadow-lg">
        <Todo />
      </div>
      <div className="m-2 p-2 border-2 rounded-lg shadow-lg">
        <ContextExample />
      </div>
    </div>
  );
}

export default App;
