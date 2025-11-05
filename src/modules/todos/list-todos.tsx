import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import {
  AlbumIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckIcon,
  CalendarIcon,
} from "lucide-react";
import { useTodos, type Todo } from "./todos-context";
import { TodoItem } from "./todo-item";
import { ItemGroup } from "@/components/ui/item";
import { useMemo, useState } from "react";

type TodoSortStrategy = `${keyof Pick<Todo, "completed" | "createdAt">}:${"asc" | "desc"}`;

const sortMap: Record<
  TodoSortStrategy | "exhaustive",
  (a: Todo, b: Todo) => number
> = {
  "completed:asc": (a) => (a.completed ? 1 : -1),
  "completed:desc": (_, b) => (b.completed ? 1 : -1),
  "createdAt:asc": (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
  "createdAt:desc": (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  exhaustive: () => 0,
};

export const ListTodos = () => {
  const { todos: dataTodos, toggleTodo, removeTodo } = useTodos();
  const [sortStrategy, setSortStrategy] = useState<TodoSortStrategy | null>(
    null
  );

  const todos = useMemo(() => {
    const sorted = [...dataTodos];

    return sorted.sort((a, b) => sortMap[sortStrategy ?? "exhaustive"](a, b));
  }, [dataTodos, sortStrategy]);

  return (
    <>
      {!dataTodos.length ? (
        <TodoListEmpty />
      ) : (
        <>
          <div className="mb-4">
            <ButtonGroup>
              <ButtonGroupText>Сортировка:</ButtonGroupText>
              <Button
                variant={
                  sortStrategy === "completed:asc" ||
                  sortStrategy === "completed:desc"
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => setSortStrategy("completed:asc")}
              >
                <CheckIcon />
                Статус
                {sortStrategy === "completed:asc" && <ArrowUpIcon />}
                {sortStrategy === "completed:desc" && <ArrowDownIcon />}
              </Button>
              <Button
                variant={
                  sortStrategy === "createdAt:asc" ||
                  sortStrategy === "createdAt:desc"
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() =>
                  setSortStrategy(
                    sortStrategy === "createdAt:asc"
                      ? "createdAt:desc"
                      : "createdAt:asc"
                  )
                }
              >
                <CalendarIcon />
                Дата
                {sortStrategy === "createdAt:asc" && <ArrowUpIcon />}
                {sortStrategy === "createdAt:desc" && <ArrowDownIcon />}
              </Button>
            </ButtonGroup>
          </div>
          <ItemGroup>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                removeTodo={removeTodo}
              />
            ))}
          </ItemGroup>
        </>
      )}
    </>
  );
};

const TodoListEmpty = () => (
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <AlbumIcon />
      </EmptyMedia>
      <EmptyTitle>Задач пока нет.</EmptyTitle>
      <EmptyDescription>
        Вы не сделали пока ни одной задачи. Вспомните что забыли, запишите и
        больше не забывайте!
      </EmptyDescription>
    </EmptyHeader>
  </Empty>
);
