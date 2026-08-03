import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import TableActions from "./TableActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  // Lógica para que el usuario no pueda escribir cualqueir cosa en el query del endpoint para filtrar
  const statutes = Object.values(Status);
  const status = statutes.includes(params.status) ? params.status : undefined;

  const where = { status };

  const orderBy = columnNames.includes(params.orderBy)
    ? { [params.orderBy]: params.direction }
    : undefined;

  const page = parseInt(params.page) || 1;
  const pageSize = params.pageSize ? parseInt(params.pageSize) : 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      assignedToUser: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  const issueCount = await prisma.issue.count({ where });

  const session = await auth();

  return (
    <Flex direction="column" gap="3">
      <TableActions disabled={session ? false : true} />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic"; // fuerza a que esta página sea dinámica, por mas de que sea estática ya que no tiene parámetros

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker | Issue List",
  description: "Browse, filter, sort, and manage all issues in your project.",
};
