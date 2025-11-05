import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { useState } from "react";
import { AlbumIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useTodos } from "./use-todos";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateTodo } from "./create-todo";
import { Checkbox } from "@/components/ui/checkbox";

export const ListTodos = () => {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const [open, setOpen] = useState(false);

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Задачи</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon />
              Создать задачу
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Создать задачу</DialogTitle>
            </DialogHeader>
            <CreateTodo
              onSubmit={(data) => {
                addTodo(data);
                setOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {todos.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <AlbumIcon />
            </EmptyMedia>
            <EmptyTitle>Задач пока нет.</EmptyTitle>
            <EmptyDescription>
              Вы не сделали пока ни одной задачи. Вспомните что забыли, запишите
              и больше не забывайте!
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ItemGroup>
          {todos.map((todo) => (
            <Item key={todo.id} variant={"outline"} >
              <ItemContent>
                <ItemTitle className={todo.completed ? "line-through opacity-50" : ""}>
                  {todo.title}
                </ItemTitle>
                {todo.description && (
                  <ItemDescription>
                    {todo.description}
                  </ItemDescription>
                )}
              </ItemContent>
              <ItemActions>
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  aria-label={todo.completed ? "Отметить как невыполненную" : "Отметить как выполненную"}
                />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeTodo(todo.id)}
                  aria-label="Удалить задачу"
                >
                  <TrashIcon />
                </Button>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      )}
    </div>
  );
};