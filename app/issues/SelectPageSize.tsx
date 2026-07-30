"use client";

import { Flex, Select, Text } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SelectPageSize = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const changePageSize = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("pageSize", value);

    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <Flex gap="1" align="center">
      <Text size="2">Issues per page:</Text>
      <Select.Root defaultValue={"10"} onValueChange={changePageSize}>
        <Select.Trigger />
        <Select.Content>
          <Select.Item value="10">10</Select.Item>
          <Select.Item value="20">20</Select.Item>
          <Select.Item value="50">50</Select.Item>
          <Select.Item value="100">100</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default SelectPageSize;
