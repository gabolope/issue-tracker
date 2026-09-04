import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { FaAward } from "react-icons/fa";

const RANK_COLORS = ["var(--amber-9)", "var(--gray-9)", "var(--gray-7)"];

const TopContributors = async () => {
  const grouped = await prisma.issue.groupBy({
    by: ["assignedToUserId"],
    where: { status: "CLOSED", assignedToUserId: { not: null } },
    _count: { assignedToUserId: true },
    orderBy: { _count: { assignedToUserId: "desc" } },
    take: 5,
  });

  const users = await prisma.user.findMany({
    where: { id: { in: grouped.map((g) => g.assignedToUserId!) } },
  });

  const contributors = grouped.map((group) => ({
    user: users.find((user) => user.id === group.assignedToUserId)!,
    resolved: group._count.assignedToUserId,
  }));

  return (
    <Card className="w-full">
      <Heading size="4" mb="5">
        Top Contributors
      </Heading>
      {contributors.length === 0 ? (
        <Text color="gray" size="2">
          No resolved issues yet.
        </Text>
      ) : (
        <Flex gap="4" wrap="wrap">
          {contributors.map(({ user, resolved }, index) => (
            <Card key={user.id} variant="surface" className="w-36">
              <Flex direction="column" align="center" gap="2" py="1">
                <Avatar src={user.image!} fallback="?" radius="full" size="6" />
                <Text
                  size="2"
                  weight="medium"
                  align="center"
                  className="w-full truncate"
                >
                  {user.name}
                </Text>
                <div className="relative w-11 h-11">
                  <FaAward
                    size={44}
                    style={{ color: RANK_COLORS[index] ?? "var(--gray-8)" }}
                  />
                  <Flex
                    align="center"
                    justify="center"
                    className="absolute rounded-full text-white font-extrabold"
                    style={{
                      top: 6,
                      left: 12,
                      width: 20,
                      height: 20,
                      fontSize: 20,
                      backgroundColor: RANK_COLORS[index] ?? "var(--gray-8)",
                      color: "var(--color-panel)",
                    }}
                  >
                    {index + 1}
                  </Flex>
                </div>
                <Text size="1" color="gray">
                  {resolved} resolved
                </Text>
              </Flex>
            </Card>
          ))}
        </Flex>
      )}
    </Card>
  );
};

export default TopContributors;
