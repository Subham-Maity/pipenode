import { useEffect, useState } from "react";

export interface TODO {
  id: number;
  text: string;
  checked: boolean;
  time: string;
}

export const useQuickTaskStore = () => {
  const [todos, setTodos] = useState<TODO[]>(() => {
    const storedTodos = localStorage.getItem("quickTasks");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("quickTasks", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo: Omit<TODO, "id">) => {
    setTodos((prevTodos) => [{ ...newTodo, id: Date.now() }, ...prevTodos]);
  };

  const updateTodo = (id: number, updates: Partial<TODO>) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo,
      ),
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return { todos, addTodo, updateTodo, removeTodo };
};
