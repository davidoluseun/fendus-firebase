import * as React from "react";
import { Flex, Box, Button, Link, Icon } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";

const HelpPopup = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("click", handleClose);

    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, []);

  const handleClose = (e: MouseEvent) => setIsOpen(false);

  const handleOpen = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <Box position="relative" zIndex="popover" id="help-popup">
      <Button
        d="flex"
        p="2"
        bg="transparent"
        _hover={{ bg: "transparent" }}
        aria-controls="help-popup"
        aria-expanded={isOpen}
        onClick={handleOpen}
      >
        Help
        <Icon
          ml="1"
          boxSize="22px"
          as={MdKeyboardArrowDown}
          transition="all 0.15s ease-in-out"
          transform={isOpen ? "rotate(-180deg)" : ""}
        />
      </Button>
      <Flex
        top="100%"
        right="0"
        bg="#fff"
        mt="1"
        w="200px"
        role="menu"
        id="category-list"
        position="absolute"
        direction="column"
        borderRadius="md"
        opacity={isOpen ? "1" : "0"}
        border=".5px solid rgba(0, 0, 0, .15)"
        boxShadow="0 1px 2px rgba(0, 0, 0, .15)"
        visibility={isOpen ? "visible" : "hidden"}
        transform={
          isOpen ? "scale(1) translateY(0)" : "scale(0.75) translateY(-21px)"
        }
        transition="all 0.2s cubic-bezier(0.5, 0, 0, 1.25), opacity 0.15s ease-out"
      >
        <Link
          as={RouteLink}
          to="/faqs"
          p="2"
          d="flex"
          fontSize="16px"
          alignItems="center"
          borderTopRadius="md"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          FAQs
        </Link>
        <Link
          as={RouteLink}
          to="/contact"
          p="2"
          d="flex"
          fontSize="16px"
          alignItems="center"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          Contact Us
        </Link>
        <Link
          p="2"
          d="flex"
          fontSize="16px"
          alignItems="center"
          borderBottomRadius="md"
          target="_blank"
          rel="noopener noreferrer"
          href="https://wa.me/2349154105623"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          Chat with an Agent
        </Link>
      </Flex>
    </Box>
  );
};

export default HelpPopup;
