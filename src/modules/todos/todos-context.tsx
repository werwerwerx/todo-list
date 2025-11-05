import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  createdAt: Date;
};

const TodosContext = createContext<{
  todos: Todo[];
  addTodo: (data: { title: string; description?: string }) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
} | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (data: { title: string; description?: string }) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodosContext.Provider value={{ todos, addTodo, toggleTodo, removeTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodos must be used within TodosProvider");
  }
  return context;
};

