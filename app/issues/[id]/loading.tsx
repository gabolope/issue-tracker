import { Box, Card, Flex, Heading, Skeleton } from "@radix-ui/themes";

const LoadingIssueDetailPage = () => {
  return (
    <Box>
      <Heading>
        <Skeleton maxWidth="20rem" />
      </Heading>
      <Flex gap="3" my="2">
        <Skeleton width="4rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          felis tellus, efficitur id convallis a, viverra eget libero. Nam magna
          erat, fringilla sed commodo sed, aliquet nec magna. Lorem ipsum dolor
          sit amet consectetur, adipisicing elit. Ex modi eius tempore culpa non
          voluptas perspiciatis omnis delectus, magnam nobis dolore mollitia
          nam! Iure ullam reprehenderit, rem deleniti dignissimos illum ut, modi
          dicta expedita alias voluptatum vitae totam? Assumenda minima eveniet
          ab saepe aperiam ipsam laboriosam quod, velit similique eaque nulla,
          doloribus a sit molestias soluta exercitationem incidunt nihil ea
          officia alias? Eius consequuntur maiores suscipit a quam maxime.
        </Skeleton>
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
