import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
    color: string;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN", color: "var(--red-9)" },
    {
      label: "In-progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
      color: "var(--violet-9)",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
      color: "var(--green-9)",
    },
  ];

  return (
    <Flex gap="4" className="w-full">
      {containers.map((container) => (
        <Link
          key={container.label}
          href={`/issues?status=${container.status}`}
          className="flex-1"
        >
          <Card
            className="h-full w-full border transition-all duration-200 hover:-translate-y-1 hover:bg-[--gray-a2] hover:shadow-lg"
            style={{ borderColor: container.color }}
          >
            <Flex direction="column" gap="1">
              <Text
                size="1"
                weight="medium"
                color="gray"
                className="uppercase tracking-wide"
              >
                {container.label}
              </Text>
              <Text size="5" weight="bold">
                {container.value}
              </Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default IssueSummary;
