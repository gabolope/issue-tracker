import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { auth } from "@/auth";
import AssigneeSelect from "./AssigneeSelect";
import { Status } from "@prisma/client";
import StatusControl from "./StatusControl";

interface Props {
  params: Promise<{ id: string; status: Status }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await auth();

  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "3", md: "4" }} gap="5">
      <Box className="md:col-span-2 lg:col-span-3">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <StatusControl id={issue.id} status={issue.status} />
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
