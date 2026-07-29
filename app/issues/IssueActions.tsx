import { Button, Flex, Tooltip } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./list/IssueStatusFilter";

const IssueActions = ({ disabled }: { disabled: boolean }) => {
  const button = (
    <Button disabled={disabled}>
      {disabled ? "New Issue" : <Link href="/issues/new">New Issue</Link>}
    </Button>
  );

  return (
    <Flex justify="between">
      <IssueStatusFilter />
      {disabled ? (
        <Tooltip content="Log in to add new issues.">{button}</Tooltip>
      ) : (
        button //TODO: REFACTORIZAR EN NUEVO COMPONENTE
      )}
    </Flex>
  );
};

export default IssueActions;
