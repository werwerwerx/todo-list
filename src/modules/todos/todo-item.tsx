import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { TrashIcon } from "lucide-react";
import type { Todo } from "./todos-context";
import { Checkbox } from "@/components/ui/checkbox";

export const TodoItem = ({
  todo,
  toggleTodo,
  removeTodo,
}: {
  todo: Todo;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}) => (
  <Item key={todo.id} variant={"outline"}>
    <ItemContent>
      <ItemTitle className={todo.completed ? "line-through opacity-50" : ""}>
        {todo.title}
      </ItemTitle>
      {todo.description && (
        <ItemDescription>{todo.description}</ItemDescription>
      )}
    </ItemContent>
    <ItemActions>
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
        aria-label={
          todo.completed
            ? "Отметить как невыполненную"
            : "Отметить как выполненную"
        }
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
);
