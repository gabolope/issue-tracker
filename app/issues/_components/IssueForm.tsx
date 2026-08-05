"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Grid,
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

const IssueForm = ({
  issue,
  extraActions,
}: {
  issue?: Issue;
  extraActions?: React.ReactNode;
}) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<issueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: { title: issue?.title, description: issue?.description },
  });

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
    <div>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <MdError />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-3" onSubmit={onSubmit}>
        <Grid columns={{ initial: "1", sm: "3fr 1fr" }} gap="5">
          <Box className="space-y-3">
            <TextField.Root placeholder="Title" {...register("title")} />
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <SimpleMDE placeholder="Description" {...field} />
              )}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
          </Box>
          <Flex direction="column" gap="3">
            <Button disabled={isSubmitting}>
              {issue ? (
                <>
                  <Pencil2Icon />
                  Update Issue
                </>
              ) : (
                "Submit New Issue"
              )}
              <Spinner loading={isSubmitting} />
            </Button>
            <CancelButton isDirty={isDirty} />
            {extraActions}
          </Flex>
        </Grid>
      </form>
    </div>
  );
};

export default IssueForm;

const CancelButton = ({ isDirty }: { isDirty: boolean }) => {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  if (!isDirty) {
    return (
      <Button type="button" color="gray" onClick={handleCancel}>
        Cancel
      </Button>
    );
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="gray">Cancel</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Discard changes?</AlertDialog.Title>
        <AlertDialog.Description size="2">
          You have unsaved changes. If you leave now, they will be lost.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Keep editing
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={handleCancel}>
              Discard changes
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
