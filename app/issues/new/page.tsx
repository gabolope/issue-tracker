"use client";
import axios from "axios";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

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

  const { register, control, handleSubmit } = useForm<issueForm>();

  const onSubmit: SubmitHandler<issueForm> = async (data) => {
    await axios.post("/api/issues", data);
    router.push("/issues");
  };

  return (
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
  );
};

export default NewIssuePage;
