import { Flex, Link, Box, Icon } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { MdKitchen } from "react-icons/md";
import { BsHouseDoor } from "react-icons/bs";
import { RiHandbagLine } from "react-icons/ri";
import { IoFitnessOutline } from "react-icons/io5";
import { GiAirplaneArrival } from "react-icons/gi";

const Categories = () => {
  return (
    <Flex
      p="4"
      mr="6"
      w="230px"
      bg="#fff"
      flexShrink={0}
      borderRadius="md"
      direction="column"
      fontSize="16px"
      display={{ base: "none", lg: "flex" }}
      boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
    >
      <Link
        as={RouteLink}
        to="/products/arrivals"
        py="2"
        px="4"
        mx="-4"
        _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
      >
        <Flex align="center">
          <Icon as={GiAirplaneArrival} boxSize="20px" mr="2" />
          <Box as="span">New Arrivals</Box>
        </Flex>
      </Link>

      <Link
        as={RouteLink}
        to="/products/kitchen"
        py="2"
        px="4"
        mx="-4"
        _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
      >
        <Flex align="center">
          <Icon as={MdKitchen} boxSize="20px" mr="2" />
          <Box as="span">Kitchen</Box>
        </Flex>
      </Link>

      <Link
        as={RouteLink}
        to="/products/household"
        py="2"
        px="4"
        mx="-4"
        _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
      >
        <Flex align="center">
          <Icon as={BsHouseDoor} boxSize="20px" mr="2" />
          <Box as="span">Household</Box>
        </Flex>
      </Link>

      <Link
        as={RouteLink}
        to="/products/fitness"
        py="2"
        px="4"
        mx="-4"
        _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
      >
        <Flex align="center">
          <Icon as={IoFitnessOutline} boxSize="20px" mr="2" />
          <Box as="span">Fitness</Box>
        </Flex>
      </Link>

      <Link
        as={RouteLink}
        to="/products/bags"
        py="2"
        px="4"
        mx="-4"
        _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
      >
        <Flex align="center">
          <Icon as={RiHandbagLine} boxSize="20px" mr="2" />
          <Box as="span">Bags</Box>
        </Flex>
      </Link>

      <Link
        as={RouteLink}
        to="/products/ladies"
        py="2"
        px="4"
        mx="-4"
        _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
      >
        <Flex align="center">
          <Icon as={GiAirplaneArrival} boxSize="20px" mr="2" />
          <Box as="span">Ladies</Box>
        </Flex>
      </Link>

      <Link
        as={RouteLink}
        to="/products/kitchen"
        py="2"
        px="4"
        mx="-4"
        _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
      >
        <Flex align="center">
          <Icon as={MdKitchen} boxSize="20px" mr="2" />
          <Box as="span">Kitchen</Box>
        </Flex>
      </Link>

      <Link
        as={RouteLink}
        to="/products/household"
        py="2"
        px="4"
        mx="-4"
        _hover={{ textDecor: "none", bg: "primary", color: "#fff" }}
      >
        <Flex align="center">
          <Icon as={BsHouseDoor} boxSize="20px" mr="2" />
          <Box as="span">Household</Box>
        </Flex>
      </Link>
    </Flex>
  );
};

export default Categories;
