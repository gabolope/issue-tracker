import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";
import AssigneeSelect from "../AssigneeSelect";
import DeleteIssueButton from "../DeleteIssueButton";
import StatusControl from "../StatusControl";

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue) notFound();

  return (
    <Box className="md:col-span-2 lg:col-span-3">
      <IssueForm
        issue={issue}
        extraActions={
          <>
            <StatusControl id={issue.id} status={issue.status} />
            <AssigneeSelect issue={issue} />
            <DeleteIssueButton issueId={issue.id} />
          </>
        }
      />
    </Box>
  );
};

export default EditIssuePage;
