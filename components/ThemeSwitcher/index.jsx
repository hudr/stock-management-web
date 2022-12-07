import { IconButton, useColorMode } from "@chakra-ui/react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Dark/Light Mode"
      variant="ghost"
      onClick={toggleColorMode}
      icon={
        colorMode === "light" ? (
          <MdOutlineDarkMode size={25} />
        ) : (
          <MdOutlineLightMode size={25} />
        )
      }
    />
  );
};

export default ThemeSwitcher;
