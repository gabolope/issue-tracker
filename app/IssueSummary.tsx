import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  const borderColor = {
    OPEN: "border-red-500",
    IN_PROGRESS: "border-purple-500",
    CLOSED: "border-green-500",
  };

  return (
    <Flex gap="4" className="w-full">
      {containers.map((container) => (
        <Link
          key={container.label}
          href={`/issues?status=${container.status}`}
          className="flex-1"
        >
          <Card
            className={`h-full w-full border ${borderColor[container.status]} transition-all hover:shadow-lg hover:-translate-y-0.5`}
          >
            <Flex direction="column" gap="1">
              <Text size="2" weight="medium">
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
