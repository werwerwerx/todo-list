import { useState } from "react";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
}

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (data: { title: string; description?: string }) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      completed: false,
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

  return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
  };
};