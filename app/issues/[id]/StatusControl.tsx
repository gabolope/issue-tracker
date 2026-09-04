"use client";

import { Status } from "@prisma/client";
import { SegmentedControl } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  id: number;
  status: Status;
}

const StatusControl = ({ id, status }: Props) => {
  const router = useRouter();

  const [newStatus, setStatus] = useState(status);

  const changeStatus = async (value: "OPEN" | "IN_PROGRESS" | "CLOSED") => {
    const previousStatus = newStatus;

    try {
      setStatus(value);
      await axios.patch("/api/issues/" + id, {
        status: value,
      });
    } catch (error) {
      setStatus(previousStatus);
      toast.error("Status couldn't be changed");
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <SegmentedControl.Root
        value={newStatus}
        size="1"
        style={{ minWidth: 0, height: "2rem" }}
        onValueChange={changeStatus}
        className="[&_.rt-SegmentedControlItemLabel]:whitespace-nowrap"
      >
        <SegmentedControl.Item value="OPEN">Open</SegmentedControl.Item>
        <SegmentedControl.Item value="IN_PROGRESS">
          In Progress
        </SegmentedControl.Item>
        <SegmentedControl.Item value="CLOSED">Closed</SegmentedControl.Item>
      </SegmentedControl.Root>
    </>
  );
};

export default StatusControl;
