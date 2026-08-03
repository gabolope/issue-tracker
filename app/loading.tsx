import {
  Flex,
  Grid,
  Card,
  Skeleton,
  Avatar,
  Heading,
  Link,
  Table,
} from "@radix-ui/themes";

export default function LoadingHome() {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        {/* Skeleton de IssueSummary: 3 cards con contador */}
        <Grid columns="3" gap="4">
          <Card>
            <Flex direction="column" gap="2" p="1">
              <Skeleton height="16px" width="60%" />
              <Skeleton height="28px" width="40%" />
            </Flex>
          </Card>
          <Card>
            <Flex direction="column" gap="2" p="1">
              <Skeleton height="16px" width="60%" />
              <Skeleton height="28px" width="40%" />
            </Flex>
          </Card>
          <Card>
            <Flex direction="column" gap="2" p="1">
              <Skeleton height="16px" width="60%" />
              <Skeleton height="28px" width="40%" />
            </Flex>
          </Card>
        </Grid>

        {/* Skeleton de IssueChart */}
        <Card>
          <Skeleton height="300px" width="100%" />
        </Card>
      </Flex>

      {/* Skeleton de LatestIssues */}
      <Card>
        <Heading size="4" mb="5">
          Latest Issues
        </Heading>
        <Table.Root>
          <Table.Body>
            {Array.from({ length: 5 }).map((_, i) => (
              <Table.Row key={i}>
                <Table.Cell>
                  <Flex justify="between">
                    <Flex direction="column" align="start" gap="2">
                      <Skeleton>
                        <Link href="#">Issue title placeholder</Link>
                      </Skeleton>
                      <Skeleton>
                        <span>OPEN</span>
                      </Skeleton>
                    </Flex>
                    <Skeleton>
                      <Avatar src="" fallback="?" radius="full" size="2" />
                    </Skeleton>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </Grid>
  );
}
