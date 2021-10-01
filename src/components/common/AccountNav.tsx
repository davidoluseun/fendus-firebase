import { Flex, Link, Box, Icon } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { connect } from "react-redux";
import { BsBagFill } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { FaUser } from "react-icons/fa";

type AccountNavProps = {
  storeItems: APP.StoreItemTypes[];
};

const AccountNav = ({ storeItems }: AccountNavProps) => {
  const { length: count } = storeItems.filter(
    (storeItem: APP.StoreItemTypes) => storeItem.saved === true
  );

  return (
    <Flex
      p="4"
      bg="#fff"
      direction="column"
      alignSelf="start"
      borderRadius="md"
      display={{ base: "none", lg: "flex" }}
      boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
    >
      <Link
        as={RouteLink}
        to="/profile"
        py="3"
        px="2"
        display="flex"
        alignItems="center"
        _hover={{ textDecor: "none" }}
      >
        <Icon mr="3" as={FaUser} />
        Profile
      </Link>
      <Link
        as={RouteLink}
        to="/orders"
        py="3"
        px="2"
        display="flex"
        alignItems="center"
        _hover={{ textDecor: "none" }}
      >
        <Icon mr="3" as={BsBagFill} />
        Orders
      </Link>

      <Link
        as={RouteLink}
        to="/wishlist"
        py="3"
        px="2"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        _hover={{ textDecor: "none" }}
      >
        <Box>
          <Icon mr="3" as={MdFavorite} />
          Wishlist
        </Box>
        {count > 0 && <Box color="primary">{count < 100 ? count : "99+"}</Box>}
      </Link>
    </Flex>
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  storeItems: state.store.storeItems,
});

export default connect(mapStateToProps)(AccountNav);
