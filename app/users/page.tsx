import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { PersonIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Table,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { IoIosLogIn } from "react-icons/io";
import DeleteButton from "../components/DeleteButton";

const UsersPage = async () => {
  // Si el usuario no está logueado, no se muestra la lista:
  const session = await auth();
  if (!session)
    return (
      <Flex justify="center" align="center" minHeight="70vh">
        <Card size="4" style={{ maxWidth: 380 }}>
          <Flex direction="column" align="center" gap="3" py="4">
            <Flex
              align="center"
              justify="center"
              width="56px"
              height="56px"
              style={{
                borderRadius: "50%",
                backgroundColor: "var(--accent-a3)",
              }}
            >
              <PersonIcon width="24" height="24" color="var(--accent-11)" />
            </Flex>
            <Heading size="5" align="center">
              Log in to see users
            </Heading>
            <Text size="2" color="gray" align="center">
              You need an account to view and manage the list of users.
            </Text>
            <Link href="/api/auth/signin" className="nav-link">
              <Button size="3" mt="2">
                <IoIosLogIn />
                Log in
              </Button>
            </Link>
          </Flex>
        </Card>
      </Flex>
    );

  // Si usuario está logueado, se traen los users y se renderizan:
  const users = await prisma.user.findMany();
  return (
    <Box>
      <Flex justify="between" align="center" mb="5">
        <Heading size="6">Users</Heading>
        <Badge color="gray" size="2">
          {users.length} {users.length === 1 ? "user" : "users"}
        </Badge>
      </Flex>

      {users.length === 0 ? (
        <Card>
          <Flex direction="column" align="center" gap="2" py="6">
            <PersonIcon width="32" height="32" color="var(--gray-9)" />
            <Text color="gray">No users found.</Text>
          </Flex>
        </Card>
      ) : (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Email
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden sm:table-cell"></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.RowHeaderCell>
                  <Flex align="center" gap="3">
                    <Avatar
                      src={user.image ?? undefined}
                      fallback={user.name?.[0] ?? "?"}
                      radius="full"
                      size={{ initial: "1", sm: "3" }}
                    />
                    <Box>
                      <Text
                        as="div"
                        size={{ initial: "2", sm: "3" }}
                        weight="medium"
                      >
                        {user.name ?? "Unnamed user"}
                      </Text>
                      <Text
                        as="div"
                        size="1"
                        color="gray"
                        className="md:hidden"
                      >
                        {user.email}
                      </Text>
                    </Box>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell
                  className="hidden md:table-cell"
                  style={{ verticalAlign: "middle" }}
                >
                  <Text color="gray">{user.email}</Text>
                </Table.Cell>
                <Table.Cell
                  align="right"
                  className="hidden sm:table-cell"
                  style={{ verticalAlign: "middle" }}
                >
                  <DeleteButton itemId={user.id} itemType="users" />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </Box>
  );
};

export default UsersPage;
