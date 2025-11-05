import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { Container } from "@/components/container";
import { CreateTodo } from "./create-todo";
import { useState } from "react";

export const TodosLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Задачи</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon />
              Создать задачу
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xs!">
            <DialogHeader>
              <DialogTitle>Создать задачу</DialogTitle>
              <DialogDescription>
                Добавьте новую задачу в ваш список
              </DialogDescription>
            </DialogHeader>
            <CreateTodo
              onSubmit={() => {
                setOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {children}
    </Container>
  );
};
