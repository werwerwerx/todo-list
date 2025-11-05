import { TodosProvider } from "./modules/todos/todos-context";
import { TodosLayout } from "./modules/todos/todos.layout";
import { ListTodos } from "./modules/todos/list-todos";

function App() {
  return (
    <div className="min-w-screen bg-background text-foreground min-h-screen flex flex-col">
      <TodosProvider>
        <TodosLayout>
          <ListTodos />
        </TodosLayout>
      </TodosProvider>
    </div>
  );
}

export default App;
