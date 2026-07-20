"use client";
import axios from "axios";
import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdError } from "react-icons/md";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  //import dinámico dado que había un error con el import clásico
  ssr: false,
});

interface issueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const { register, control, handleSubmit } = useForm<issueForm>();

  const onSubmit: SubmitHandler<issueForm> = async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("An unexpected error ocurred.");
    }
  };

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

      <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root placeholder="Title" {...register("title")} />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
