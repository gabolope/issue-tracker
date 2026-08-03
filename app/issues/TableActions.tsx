import { Flex } from "@radix-ui/themes";
import IssueStatusFilter from "./IssueStatusFilter";
import NewIssueButton from "./NewIssueButton";
import SelectPageSize from "./SelectPageSize";

const TableActions = ({ disabled }: { disabled: boolean }) => {
  return (
    <Flex justify="between">
      <Flex gap="5">
        <IssueStatusFilter />
        <SelectPageSize />
      </Flex>
      <NewIssueButton disabled={disabled} />
    </Flex>
  );
};

export default TableActions;
