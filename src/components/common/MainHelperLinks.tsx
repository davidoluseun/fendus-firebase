import * as React from "react";
import { Flex, Link, Icon } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

type linksTypes = {
  text: string | undefined;
  to: string;
};

type MainHelperLinksTypes = {
  links: linksTypes[];
};

const MainHelperLinks = ({ links }: MainHelperLinksTypes) => {
  return (
    <Flex align="center" fontSize="14px" display={{ base: "none", lg: "flex" }}>
      {links.map((link) => (
        <React.Fragment key={link.text}>
          <Link
            p="2"
            to={link.to}
            as={RouteLink}
            _hover={{ textDecor: "none" }}
            maxW="120px"
            isTruncated
            textTransform="capitalize"
            color={links.indexOf(link) === links.length - 1 ? "primary" : ""}
          >
            {link.text}
          </Link>
          <Icon boxSize="18px" as={MdKeyboardArrowRight} />
        </React.Fragment>
      ))}
      <Link
        p="2"
        to="/cart"
        as={RouteLink}
        _hover={{ textDecor: "none" }}
        textTransform="capitalize"
      >
        Cart
      </Link>
    </Flex>
  );
};

export default MainHelperLinks;
