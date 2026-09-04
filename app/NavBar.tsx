"use client";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  IconButton,
  Spinner,
  Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBug } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";

const NavBar = () => {
  return (
    <nav className="mb-5 border-b px-5 py-3 h-12">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="3">
            <Link href="/" className="hidden sm:block">
              <FaBug className="nav-link" />
            </Link>

            <MobileNavMenu />

            <NavLinks />
          </Flex>
          <Flex align="center" gap="5">
            <ThemeToggle />
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

// Componentes de la NavBar (sólo se consumen aquí)
const NavLinks = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
    { label: "Users", href: "/users" },
  ];
  const currentPath = usePathname();

  return (
    <ul className="hidden sm:flex space-x-6 ">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classnames({
              "nav-link": true,
              "!text-[var(--accent-11)] font-semibold":
                currentPath === link.href,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

// Mobile Menu:
const MobileNavMenu = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
    { label: "Users", href: "/users" },
  ];
  const currentPath = usePathname();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton
          variant="ghost"
          color="gray"
          aria-label="Open menu"
          className="sm:hidden"
        >
          <CiMenuBurger />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {links.map((link) => (
          <DropdownMenu.Item key={link.href} asChild>
            <Link
              href={link.href}
              className={classnames({
                "!text-[var(--accent-11)] font-semibold":
                  currentPath === link.href,
              })}
            >
              {link.label}
            </Link>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Spinner size="3" />;

  if (status === "unauthenticated")
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Log in
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            // referrerPolicy="no-referrer" // en caso de que no cargue la imagen
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout" className="w-full">
              Log Out
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // evita mismatch de hidratación: no renderizamos el ícono real hasta estar en cliente
  useEffect(() => setMounted(true), []);
  if (!mounted) return <IconButton variant="ghost" color="gray" disabled />;

  return (
    <IconButton
      variant="ghost"
      color="gray"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      size="2"
    >
      {resolvedTheme === "dark" ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};
