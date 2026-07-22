"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import {
  Box,
  Button,
  Callout,
  Card,
  Skeleton,
  Spinner,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdError } from "react-icons/md";
import z from "zod";

//import dinámico para indicar que el componente no se renderice en el server
//En next, todos los componentes se renderizan primero en el server, por más que sean del lado del cliente
//SimpleMDE no puede ser renderizado en el server, por lo que hay que indicar que no se renderice en el server de manera directa (ssr:false)
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => (
    <Box>
      <Card className="prose" mt="4">
        <Skeleton height="345px"></Skeleton>
      </Card>
    </Box>
  ),
});

type issueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<issueFormData>({ resolver: zodResolver(issueSchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues"); //lleva al usuario a ese endpoint
      router.refresh(); //hace que el browser refresque su cache, así el usuario ve los cambios de manera inmediata
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error ocurred.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <MdError />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              defaultValue={issue?.description}
              placeholder="Description"
              {...field}
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}
          <Spinner loading={isSubmitting} />
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
