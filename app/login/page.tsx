import { signIn } from "@/auth";
import { Button, Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import { FaBug } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineClipboardList,
} from "react-icons/hi";

const features = [
  { icon: HiOutlineClipboardList, label: "Organize every issue in one place" },
  { icon: HiOutlineUserGroup, label: "Assign work to your team" },
  { icon: HiOutlineChartBar, label: "Track progress with live stats" },
];

const LoginPage = () => {
  return (
    <Flex justify="center" className="pt-10 sm:pt-16">
      <Card size="4" className="w-full max-w-md">
        <Flex direction="column" align="center" gap="2">
          <FaBug size="28" className="text-[var(--accent-9)]" />
          <Heading as="h1" size="6">
            Welcome to Critter
          </Heading>
          <Text color="gray" size="2" align="center">
            Track your issues and mark them as solved.
          </Text>
        </Flex>

        <Flex direction="column" gap="3" my="5">
          {features.map(({ icon: Icon, label }) => (
            <Flex key={label} align="center" gap="3">
              <Icon className="text-[var(--accent-9)] shrink-0" size={18} />
              <Text size="2" color="gray">
                {label}
              </Text>
            </Flex>
          ))}
        </Flex>

        <Separator size="4" my="4" />

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <Button
            type="submit"
            variant="surface"
            color="gray"
            size="3"
            className="w-full"
          >
            <FcGoogle size="18" />
            Sign in with Google
          </Button>
        </form>

        <Text size="1" color="gray" align="center" className="block mt-4">
          By continuing you agree to sign in using your Google account.
        </Text>
      </Card>
    </Flex>
  );
};

export default LoginPage;

export const metadata: Metadata = {
  title: "Critter | Log in",
  description: "Sign in to Critter to track your issues.",
};
