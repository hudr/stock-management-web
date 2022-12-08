import React from "react";
import NextLink from "next/link";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Hide,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiHome,
  FiUser,
  FiUsers,
  FiLayers,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import ThemeSwitcher from "../ThemeSwitcher";
import { useAuth } from "../../hooks/auth";

const LinkItems = [
  { name: "Painel", icon: FiHome, href: "/painel" },
  { name: "Perfil", icon: FiUser, href: "/perfil" },
  { name: "Usuários", icon: FiUsers, href: "/usuarios" },
  { name: "Cargos", icon: FiLayers, href: "/cargos" },
];

export default function Sidebar({ pageContent }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { signOut } = useAuth();
  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", lg: "block" }}
        signOut={signOut}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} signOut={signOut} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", lg: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, lg: 60 }} p="4">
        {pageContent}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, signOut, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue("#fff", "gray.900")}
      w={{ base: "full", lg: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          Logo
        </Text>

        <Hide below="md">
          <ThemeSwitcher />
        </Hide>

        <CloseButton display={{ base: "flex", lg: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          href={link.href}
          onClick={onClose}
        >
          {link.name}
        </NavItem>
      ))}

      <LogOutItem signOut={signOut} />
    </Box>
  );
};

const NavItem = ({ icon, href, children, ...rest }) => {
  return (
    <Link
      href={href}
      as={NextLink}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="md"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "teal",
          color: "#fff",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "#fff",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const LogOutItem = ({ signOut }) => {
  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="md"
      role="group"
      cursor="pointer"
      _hover={{
        bg: "red.400",
        color: "#fff",
      }}
      onClick={signOut}
    >
      <Icon
        mr="4"
        fontSize="16"
        _groupHover={{
          color: "#fff",
        }}
        as={FiLogOut}
      />
      Sair
    </Flex>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, lg: 60 }}
      px={{ base: 4, lg: 24 }}
      height="16"
      alignItems="center"
      bg={useColorModeValue("#fff", "gray.900")}
      justifyContent="space-between"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" fontWeight="bold">
        Logo
      </Text>

      <ThemeSwitcher />
    </Flex>
  );
};
