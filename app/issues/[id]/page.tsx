import DeleteButton from "@/app/components/DeleteButton";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import StatusControl from "./StatusControl";

interface Props {
  params: Promise<{ id: string; status: Status }>;
}

// Guardamos el user en un cache para hacer más liviana la conexión con el Server, así no se llama para buscar el usuario y luego para mostrar la metadata
const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } }),
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await auth();

  const { id } = await params;

  const issue = await fetchUser(parseInt(id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "3", md: "4" }} gap="4">
      <Box className="md:col-span-2 lg:col-span-3">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <StatusControl id={issue.id} status={issue.status} />
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteButton itemId={issue.id.toString()} itemType="issues" />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await fetchUser(parseInt(id));

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}
