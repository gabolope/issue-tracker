"use client";

import { Issue } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60 segs,
    retry: 3,
  });

  if (error) return null;

  if (isLoading) return <Skeleton height="2rem" />;

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId ?? "unassigned"}
      onValueChange={(value) => {
        axios.patch("/api/issues/" + issue.id, {
          assignedToUserId: value === "unassigned" ? null : value,
        }); // no es necesario hacer un await porque no vamos a hacer nada luego, la UI le da el feedback al user.
      }}
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
  );
};

export default AssigneeSelect;
