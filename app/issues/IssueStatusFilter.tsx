"use client";

import { Select } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Status } from "../generated/prisma/enums";

const status = [
  { label: "All", value: "" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const changeFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    router.push(
      `${pathName}${params.toString() ? `?${params.toString()}` : ""}`,
    );
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={changeFilter}
    >
      <Select.Trigger placeholder="Filter by status..."></Select.Trigger>
      <Select.Content>
        {status.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
