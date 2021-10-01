import * as React from "react";
import { Box, IconButton, Button, Link, Flex } from "@chakra-ui/react";
import { Icon, Divider } from "@chakra-ui/react";
import { Link as RouteLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { FiX } from "react-icons/fi";
import { AiOutlineUserAdd, AiOutlineUser } from "react-icons/ai";
import { BsBag, BsHouseDoor } from "react-icons/bs";
import { MdFavoriteBorder, MdKitchen } from "react-icons/md";
import { RiHandbagLine, RiQuestionAnswerLine } from "react-icons/ri";
import { BiMessageRoundedDots } from "react-icons/bi";
import { IoFitnessOutline, IoLogInOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { GiAirplaneArrival } from "react-icons/gi";
import { setCurrentUser } from "../../redux";
import { auth } from "../../firebase";

type SideNavProps = {
  isOpen: boolean;
  currentUser: APP.CurrentUserTypes;
  storeItems: APP.StoreItemTypes[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: (payload: APP.CurrentUserTypes) => APP.AuthActionTypes;
};

const SideNav = (props: SideNavProps) => {
  const { isOpen, setIsOpen, currentUser, setCurrentUser, storeItems } = props;
  const history = useHistory();

  const { length: count } = storeItems.filter(
    (storeItem: APP.StoreItemTypes) => storeItem.saved === true
  );

  const handleCloseSideNav = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  React.useEffect(() => {
    window.addEventListener("click", handleCloseSideNav);

    return () => {
      window.removeEventListener("click", handleCloseSideNav);
    };
  }, [handleCloseSideNav]);

  const handleSignOut = () => {
    auth.signOut();
    setCurrentUser(null);
  };

  const handlePushToSignUp = () => {
    history.push("/sign-up");
  };

  return (
    <Box
      p="4"
      left="0"
      top="0"
      bottom="0"
      bg="#fff"
      w="280px"
      id="side-nav"
      position="fixed"
      zIndex="modal"
      overflowY="auto"
      boxShadow="0 1px 2px rgba(0, 0, 0, 1)"
      opacity={isOpen ? "1" : "0"}
      visibility={{ base: isOpen ? "visible" : "hidden", lg: "hidden" }}
      transform={
        isOpen ? "scale(1) translateY(0)" : "scale(0.75) translateY(-21px)"
      }
      fontSize="16px"
      transition="all 0.2s cubic-bezier(0.5, 0, 0, 1.25), opacity 0.15s ease-out"
    >
      <IconButton
        position="absolute"
        right="1"
        top="1"
        borderRadius="full"
        aria-controls="side-nav"
        aria-label="Close navigation"
        aria-expanded={isOpen}
        icon={<FiX size="22px" />}
        bg="transparent"
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        onClick={handleCloseSideNav}
      />
      <Flex mb="2" fontWeight="semibold" fontSize="18px">
        <Box mr="1">Hi👋</Box>
        <Box>{currentUser?.displayName && `${currentUser.displayName}`}</Box>
      </Flex>

      <Flex direction="column">
        {currentUser ? (
          <Button
            px="4"
            py="2"
            mx="-4"
            bg="transparent"
            fontWeight="normal"
            borderRadius="none"
            justifyContent="flex-start"
            onClick={handleSignOut}
            _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
          >
            <Flex align="center">
              <Icon as={IoLogOutOutline} mr="2" boxSize="22px" />
              <Box as="span">Sign Out</Box>
            </Flex>
          </Button>
        ) : (
          <Link
            as={RouteLink}
            to="/orders"
            px="4"
            py="2"
            mx="-4"
            display="flex"
            alignItems="center"
            _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
          >
            <Flex align="center">
              <Icon as={IoLogInOutline} mr="2" boxSize="22px" />
              <Box as="span">Sign In</Box>
            </Flex>
          </Link>
        )}

        {!currentUser && (
          <Button
            px="4"
            py="2"
            mx="-4"
            bg="transparent"
            fontWeight="normal"
            borderRadius="none"
            justifyContent="flex-start"
            onClick={handlePushToSignUp}
            _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
          >
            <Flex align="center">
              <Icon as={AiOutlineUserAdd} mr="2" boxSize="22px" />
              <Box as="span">Sign Up</Box>
            </Flex>
          </Button>
        )}

        <Divider my="3" borderColor="#000" borderBottomWidth="1.5px" />

        <Link
          as={RouteLink}
          to="/profile"
          px="4"
          py="2"
          mx="-4"
          display="flex"
          alignItems="center"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Flex align="center">
            <Icon as={AiOutlineUser} mr="2" boxSize="22px" />
            <Box as="span">Profile</Box>
          </Flex>
        </Link>
        <Link
          as={RouteLink}
          to="/orders"
          px="4"
          py="2"
          mx="-4"
          display="flex"
          alignItems="center"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Flex align="center">
            <Icon as={BsBag} mr="2" boxSize="22px" />
            <Box as="span">Orders</Box>
          </Flex>
        </Link>
        <Link
          as={RouteLink}
          to="/wishlist"
          px="4"
          py="2"
          mx="-4"
          className="wishlist"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Flex justify="space-between">
            <Flex align="center">
              <Icon as={MdFavoriteBorder} mr="2" boxSize="22px" />
              <Box as="span">Wishlist</Box>
            </Flex>
            {count > 0 && (
              <Box className="wishlist-count" color="primary">
                {count < 100 ? count : "99+"}
              </Box>
            )}
          </Flex>
        </Link>

        <Divider my="3" borderColor="#000" borderBottomWidth="1.5px" />

        <Link
          as={RouteLink}
          to="/products/arrivals"
          px="4"
          py="2"
          mx="-4"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Flex align="center">
            <Icon as={GiAirplaneArrival} boxSize="22px" mr="2" />
            <Box as="span">New Arrivals</Box>
          </Flex>
        </Link>

        <Link
          as={RouteLink}
          to="/products/kitchen"
          px="4"
          py="2"
          mx="-4"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Flex align="center">
            <Icon as={MdKitchen} boxSize="22px" mr="2" />
            <Box as="span">Kitchen</Box>
          </Flex>
        </Link>

        <Link
          as={RouteLink}
          to="/products/household"
          px="4"
          py="2"
          mx="-4"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Flex align="center">
            <Icon as={BsHouseDoor} boxSize="22px" mr="2" />
            <Box as="span">Household</Box>
          </Flex>
        </Link>

        <Link
          as={RouteLink}
          to="/products/fitness"
          px="4"
          py="2"
          mx="-4"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Flex align="center">
            <Icon as={IoFitnessOutline} boxSize="22px" mr="2" />
            <Box as="span">Fitness</Box>
          </Flex>
        </Link>

        <Link
          as={RouteLink}
          to="/products/bags"
          px="4"
          py="2"
          mx="-4"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Flex align="center">
            <Icon as={RiHandbagLine} boxSize="22px" mr="2" />
            <Box as="span">Bags</Box>
          </Flex>
        </Link>

        <Link
          as={RouteLink}
          to="/products/arrivals"
          px="4"
          py="2"
          mx="-4"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Flex align="center">
            <Icon as={GiAirplaneArrival} boxSize="22px" mr="2" />
            <Box as="span">New Arrivals</Box>
          </Flex>
        </Link>

        <Link
          as={RouteLink}
          to="/products/kitchen"
          px="4"
          py="2"
          mx="-4"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Flex align="center">
            <Icon as={MdKitchen} boxSize="22px" mr="2" />
            <Box as="span">Kitchen</Box>
          </Flex>
        </Link>

        <Link
          as={RouteLink}
          to="/products/household"
          px="4"
          py="2"
          mx="-4"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Flex align="center">
            <Icon as={BsHouseDoor} boxSize="22px" mr="2" />
            <Box as="span">Household</Box>
          </Flex>
        </Link>

        <Divider my="3" borderColor="#000" borderBottomWidth="1.5px" />
        <Link
          as={RouteLink}
          to="/faqs"
          px="4"
          py="2"
          mx="-4"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Flex align="center">
            <Icon as={RiQuestionAnswerLine} boxSize="22px" mr="2" />
            <Box as="span">FAQs</Box>
          </Flex>
        </Link>

        <Link
          as={RouteLink}
          to="/contact"
          px="4"
          py="2"
          mx="-4"
          _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
        >
          <Flex align="center">
            <Icon as={BiMessageRoundedDots} boxSize="22px" mr="2" />
            <Box as="span">Contact Us</Box>
          </Flex>
        </Link>
      </Flex>
    </Box>
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  currentUser: state.auth.currentUser,
  storeItems: state.store.storeItems,
});

const mapDispatchToProps = (dispatch: APP.AuthDispatchTypes) => ({
  setCurrentUser: (payload: APP.CurrentUserTypes) =>
    dispatch(setCurrentUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
