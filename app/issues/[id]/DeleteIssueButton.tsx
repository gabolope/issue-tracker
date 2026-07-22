import { Button } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color="red" className="px-1">
      <TrashIcon />
      <p>Delete Issue</p>
    </Button>
  );
};

export default DeleteIssueButton;
