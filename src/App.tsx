import { ListTodos } from "./modules/todos/list-todos";
function App() {
  
  return (
    <div className="min-w-screen bg-background text-foreground min-h-screen flex flex-col">
      <ListTodos />
    </div>
  );
}

export default App;
