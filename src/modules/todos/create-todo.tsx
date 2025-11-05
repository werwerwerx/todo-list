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
} from "@/components/ui/input-group";
import { PlusIcon, XIcon, FileTextIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(1, "Название задачи обязательно"),
  description: z.string().optional(),
});

export const CreateTodo = ({ onSubmit }: {
  onSubmit: (data: z.infer<typeof schema>) => void;
}) => {
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

  const onFormSubmit = (data: z.infer<typeof schema>) => {
    onSubmit(data);
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
            <FieldLabel htmlFor="title">Описание задачи</FieldLabel>
            <FieldContent>
              <InputGroup>
                <InputGroupAddon>
                  <FileTextIcon />
                </InputGroupAddon>
                <InputGroupInput
                  id="description"
                  placeholder="Описание задачи"
                  {...register("description")}
                  aria-invalid={errors.description ? "true" : "false"}
                />
              </InputGroup>
              <FieldError errors={errors.description ? [errors.description] : []} />
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
