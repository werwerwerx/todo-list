import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { PlusIcon, XIcon, FileTextIcon, PencilIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTodos } from "./todos-context";

const schema = z.object({
  title: z.string().min(1, "Название задачи обязательно"),
  description: z.string().optional(),
});

export const CreateTodo = ({ onSubmit }: { onSubmit: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      title: "",
      description: undefined,
    },
    resolver: zodResolver(schema),
  });

  const { addTodo } = useTodos();

  const onFormSubmit = (data: z.infer<typeof schema>) => {
    addTodo(data);
    onSubmit();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="w-full">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Название задачи</FieldLabel>
            <FieldContent>
              <InputGroup>
                <InputGroupAddon>
                  <FileTextIcon />
                </InputGroupAddon>
                <InputGroupInput
                  id="title"
                  placeholder="Название задачи"
                  {...register("title")}
                  aria-invalid={errors.title ? "true" : "false"}
                />
              </InputGroup>
              <FieldError errors={errors.title ? [errors.title] : []} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Описание задачи</FieldLabel>
            <FieldContent>
              <InputGroup className="flex flex-row">
                <InputGroupAddon align="inline-end">
                  <PencilIcon />
                </InputGroupAddon>
                <InputGroupTextarea
                  id="description"
                  placeholder="Описание задачи"
                  {...register("description")}
                  aria-invalid={errors.description ? "true" : "false"}
                />
              </InputGroup>
              <FieldError
                errors={errors.description ? [errors.description] : []}
              />
            </FieldContent>
          </Field>

          <Field orientation="horizontal" className="justify-between">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                <XIcon />
                Отменить
              </Button>
            </DialogClose>
            <Button type="submit">
              <PlusIcon />
              Создать
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
