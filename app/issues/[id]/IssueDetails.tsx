"use client";

import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import Markdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  return (
    <>
      <Button
        variant="ghost"
        color="gray"
        className="mb-4"
        onClick={() => router.back()}
      >
        <DoubleArrowLeftIcon />
        Back to issues
      </Button>

      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose dark:prose-invert max-w-full" mt="4">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </>
  );
};

export default IssueDetails;
