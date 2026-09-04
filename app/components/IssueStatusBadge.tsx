import { Status } from "@prisma/client";

const statusMap: Record<Status, { label: string; color: string }> = {
  OPEN: { label: "Open", color: "var(--red-9)" },
  IN_PROGRESS: { label: "In progress", color: "var(--violet-9)" },
  CLOSED: { label: "Closed", color: "var(--green-9)" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  const { label, color } = statusMap[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide whitespace-nowrap"
      style={{ color }}
    >
      <span
        className="w-[7px] h-[7px] shrink-0"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
};

export default IssueStatusBadge;
