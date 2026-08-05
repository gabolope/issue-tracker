import prisma from "@/prisma/client";
import { Avatar, Flex, Table, Text } from "@radix-ui/themes";
import DeleteButton from "../components/DeleteButton";

const UsersPage = async () => {
  const users = await prisma.user.findMany();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id}>
            <Table.RowHeaderCell>
              <Flex align="center" gap="3">
                <Avatar
                  src={user.image ?? undefined}
                  fallback="?"
                  radius="full"
                  size="4"
                />
                <Text size="5">{user.name}</Text>
              </Flex>
            </Table.RowHeaderCell>
            <Table.Cell>
              <DeleteButton itemId={user.id} itemType="users" />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default UsersPage;
