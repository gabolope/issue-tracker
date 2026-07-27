import { Button, Tooltip } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  disabled: boolean;
}

const IssueActions = ({ disabled }: Props) => {
  const button = (
    <Button disabled={disabled}>
      {disabled ? "New Issue" : <Link href="/issues/new">New Issue</Link>}
    </Button>
  );

  return (
    <div className="mb-5">
      {disabled ? (
        <Tooltip content="Log in to add new issues.">{button}</Tooltip>
      ) : (
        button
      )}
    </div>
  );
};

export default IssueActions;
