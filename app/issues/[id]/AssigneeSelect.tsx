"use client";

import { Issue } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";
import toast from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  const assingIssue = async (value: string) => {
    toast.loading("Assigning...");
    try {
      await axios.patch("/api/issues/" + issue.id, {
        assignedToUserId: value === "unassigned" ? null : value,
      });
      toast.remove();
      toast.success(`Issue assigned.`);
    } catch (error) {
      toast.remove();
      toast.error("Changes could not be saved.");
    }
  };

  if (error) return null;

  if (isLoading) return <Skeleton height="2rem" />;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId ?? "unassigned"}
        onValueChange={assingIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item value={user.id!} key={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

// useQuery para traer los users
const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000 * 10, // actualiza los usuarios cada 10 mins
    retry: 3,
  });

export default AssigneeSelect;
