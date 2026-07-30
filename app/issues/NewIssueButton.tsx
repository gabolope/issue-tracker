import { Button, Tooltip } from "@radix-ui/themes";
import Link from "next/link";

const NewIssueButton = ({ disabled }: { disabled: boolean }) => {
  const button = (
    <Button disabled={disabled}>
      {disabled ? "New Issue" : <Link href="/issues/new">New Issue</Link>}
    </Button>
  );

  return disabled ? (
    <Tooltip content="Log in to add new issues.">{button}</Tooltip>
  ) : (
    button
  );
};

export default NewIssueButton;
