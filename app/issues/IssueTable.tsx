import { Issue, Prisma, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Avatar, Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { IssueStatusBadge, Link } from "../components";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  direction: "asc" | "desc";
  page: string;
  pageSize: string;
}

type IssueWithAssignee = Prisma.IssueGetPayload<{
  include: {
    assignedToUser: {
      select: {
        name: true;
        image: true;
      };
    };
  };
}>;

interface Props {
  searchParams: Promise<IssueQuery>;
  issues: IssueWithAssignee[];
}

// Manejo de asc y desc
const getSortParams = (column: keyof Issue, params: IssueQuery) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });

  if (params.orderBy !== column) {
    searchParams.set("orderBy", column);
    searchParams.set("direction", "asc");
    return searchParams.toString();
  }
  if (params.direction === "asc") {
    searchParams.set("direction", "desc");
    return searchParams.toString();
  }
  searchParams.delete("orderBy");
  searchParams.delete("direction");

  return searchParams.toString();
};

const IssueTable = async ({ searchParams, issues }: Props) => {
  const params = await searchParams;

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink href={`?${getSortParams(column.value, params)}`}>
                {column.label}
              </NextLink>
              {column.value === params.orderBy &&
                (params.direction === "asc" ? (
                  <ArrowUpIcon className="inline" />
                ) : (
                  <ArrowDownIcon className="inline" />
                ))}
            </Table.ColumnHeaderCell>
          ))}
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Assigned to
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row
            key={issue.id}
            className="group relative hover:bg-[--gray-a2] transition-colors"
          >
            <Table.RowHeaderCell className="group-hover:shadow-[inset_2px_0_0_0_var(--accent-9)]">
              <Link
                href={`/issues/${issue.id}`}
                className="before:absolute before:inset-0 before:content-['']"
              >
                {issue.title}
              </Link>
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
            <Table.Cell className="hidden md:table-cell">
              {issue.assignedToUser ? (
                <Flex align="center" gap="2">
                  <Avatar
                    src={issue.assignedToUser.image ?? undefined}
                    fallback={issue.assignedToUser.name?.[0] ?? "?"}
                    size="1"
                    radius="full"
                  />
                  {issue.assignedToUser.name}
                </Flex>
              ) : (
                <Flex align="center" gap="2">
                  <Avatar src={"!"} fallback={"?"} size="1" radius="full" />
                  Unassigned
                </Flex>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);
