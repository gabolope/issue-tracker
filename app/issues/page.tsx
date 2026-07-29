import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import IssueActions from "./IssueActions";
import { auth } from "@/auth";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  // Lógica para que el usuario no pueda escribir cualqueir cosa en el query del endpoint para filtrar
  const statutes = Object.values(Status);
  const status = statutes.includes(params.status) ? params.status : undefined;

  const orderBy = columns.map((column) => column.value).includes(params.orderBy)
    ? { [params.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  });

  const session = await auth();

  return (
    <>
      <IssueActions disabled={session ? false : true} />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{ query: { ...params, orderBy: column.value } }}
                >
                  {column.label}
                </NextLink>
                {column.value === params.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export const dynamic = "force-dynamic"; // fuerza a que esta página sea dinámica, por mas de que sea estática ya que no tiene parámetros

export default IssuesPage;
