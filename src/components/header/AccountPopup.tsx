import * as React from "react";
import { Flex, Box, Button, Link, Divider, Icon } from "@chakra-ui/react";
import { Link as RouteLink, useHistory } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BsBagFill } from "react-icons/bs";
import { MdFavorite, MdKeyboardArrowDown } from "react-icons/md";
import { auth } from "../../firebase";

type AccountPopupProps = {
  currentUser: APP.CurrentUserTypes;
  setCurrentUser: (payload: APP.CurrentUserTypes) => APP.AuthActionTypes;
};

const AccountPopup = ({ currentUser, setCurrentUser }: AccountPopupProps) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("click", handleClose);

    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, []);

  const handleClose = (e: MouseEvent) => setIsOpen(false);

  const handleToggle = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handlePushToSignUp = () => history.push("/sign-up");

  const handleSignOut = () => {
    auth.signOut();
    setCurrentUser(null);
  };

  return (
    <Box position="relative" zIndex="popover" id="account-popup">
      <Button
        d="flex"
        p="2"
        bg="transparent"
        aria-expanded={isOpen}
        aria-controls="account-popup"
        _hover={{ bg: "transparent" }}
        onClick={handleToggle}
        leftIcon={<FaUser size="24px" />}
      >
        {currentUser?.displayName ? `${currentUser.displayName}` : "Account"}

        <Icon
          ml="1"
          boxSize="22px"
          as={MdKeyboardArrowDown}
          transition="all 0.15s ease-in-out;"
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
        {currentUser ? (
          <Button
            p="6px"
            bg="primary"
            color="#fff"
            fontWeight="bold"
            borderRadius="sm"
            textAlign="center"
            borderTopRadius="md"
            onClick={handleSignOut}
            _hover={{ bg: "primary" }}
          >
            Sign out
          </Button>
        ) : (
          <Link
            as={RouteLink}
            to="/sign-in"
            p="6px"
            bg="primary"
            color="#fff"
            fontSize="16px"
            fontWeight="bold"
            borderRadius="sm"
            textAlign="center"
            borderTopRadius="md"
            _hover={{ textDecor: "none" }}
          >
            Sign in
          </Link>
        )}

        <Flex my="2" align="center">
          <Divider borderColor="rgba(0, 0, 0, .2)" />
          <Box mx="2" fontSize="14px">
            OR
          </Box>
          <Divider borderColor="rgba(0, 0, 0, .2)" />
        </Flex>
        <Button
          p="6px"
          bg="#f0f2f5"
          fontSize="16px"
          fontWeight="bold"
          borderRadius="sm"
          textAlign="center"
          onClick={handlePushToSignUp}
          _hover={{ bg: "#f0f2f5" }}
          _active={{ bg: "#f0f2f5" }}
          disabled={currentUser ? true : false}
        >
          Sign up
        </Button>
        <Divider mt="3" borderColor="transparent" />
        <Link
          as={RouteLink}
          to="/profile"
          p="2"
          d="flex"
          fontSize="16px"
          alignItems="center"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Icon mr="2" as={FaUser} />
          Profile
        </Link>
        <Link
          as={RouteLink}
          to="/orders"
          p="2"
          d="flex"
          fontSize="16px"
          alignItems="center"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Icon mr="2" as={BsBagFill} />
          Orders
        </Link>
        <Link
          as={RouteLink}
          to="/wishlist"
          p="2"
          d="flex"
          fontSize="16px"
          alignItems="center"
          borderBottomRadius="md"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Icon mr="2" as={MdFavorite} />
          Wishlist
        </Link>
      </Flex>
    </Box>
  );
};

export default AccountPopup;
