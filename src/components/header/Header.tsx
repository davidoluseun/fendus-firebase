import * as React from "react";
import { Box, Flex, Button, Image, IconButton } from "@chakra-ui/react";
import { Link as RouteLink, useHistory } from "react-router-dom";
import { Icon, Link } from "@chakra-ui/react";
import { connect } from "react-redux";
import { IoMdCart } from "react-icons/io";
import { CgMenu } from "react-icons/cg";
import { FiX } from "react-icons/fi";
import { MdSearch } from "react-icons/md";
import _ from "lodash";
import AccountPopup from "./AccountPopup";
import SearchBox from "../common/SearchBox";
import SearchResult from "../common/SearchResult";
import SideNav from "../common/SideNav";
import HelpPopup from "./HelpPopup";
import { setCurrentUser } from "../../redux";
import Logo from "../../images/logo.png";

type HeaderProps = {
  storeItems: APP.StoreItemTypes[];
  currentUser: APP.CurrentUserTypes;
  setCurrentUser: (payload: APP.CurrentUserTypes) => APP.AuthActionTypes;
};

const Header = ({ storeItems, currentUser, setCurrentUser }: HeaderProps) => {
  const [sideNavIsOpen, setSideNavIsOpen] = React.useState(false);
  const [searchIsOpen, setSearchIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const history = useHistory();

  const cartItems = storeItems.filter(
    (storeItem: APP.StoreItemTypes) => storeItem.numInCart > 0
  );

  let queryItems: APP.StoreItemTypes[] = [];

  if (searchQuery) {
    queryItems = storeItems.filter((storeItem) =>
      _.includes(storeItem.title.toLowerCase(), searchQuery.toLowerCase())
    );
  }

  const handlePushToProduct = () => history.push("/cart");

  const handleOpenSideNav = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setSideNavIsOpen(true);
  };

  const handleToggleSearch = (e: React.SyntheticEvent) =>
    setSearchIsOpen(!searchIsOpen);

  const handleSearch = (query: string) => setSearchQuery(query);

  const handleClearSearch = () => setSearchQuery("");

  return (
    <Box
      mb="8"
      top="0"
      as="header"
      bg="#fff"
      zIndex="sticky"
      position="sticky"
      py={{ base: "10px", lg: "3" }}
      boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
    >
      <Box px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
        <Flex flexWrap="wrap" justify="space-between">
          <Flex mr={{ lg: "10" }}>
            <IconButton
              bg="transparent"
              ml="-2"
              display={{ base: "flex", lg: "none" }}
              aria-label="Open navigation"
              aria-controls="side-nav"
              aria-expanded={sideNavIsOpen}
              icon={<CgMenu size="24px" />}
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              onClick={handleOpenSideNav}
            />
            <SideNav isOpen={sideNavIsOpen} setIsOpen={setSideNavIsOpen} />

            <Link
              as={RouteLink}
              to="/"
              px={{ sm: "2" }}
              d="flex"
              alignItems="center"
            >
              <Image src={Logo} w="110px" pl="1" h="32px" alt="" />
            </Link>
          </Flex>

          <Flex
            px="2"
            flexGrow={1}
            position="relative"
            display={{ base: "none", lg: "flex" }}
          >
            <SearchBox
              value={searchQuery}
              onChange={handleSearch}
              hasRightElement={true}
            />
            <SearchResult
              clearQuery={handleClearSearch}
              queryItems={queryItems}
            />
          </Flex>

          <Flex px={{ md: "2" }}>
            <Flex display={{ base: "none", lg: "flex" }}>
              <AccountPopup
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
              <HelpPopup />
            </Flex>

            <IconButton
              borderRadius="md"
              bg="transparent"
              display={{ base: "flex", lg: "none" }}
              aria-label="Toggle search"
              aria-controls="search"
              aria-expanded={searchIsOpen}
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              icon={
                searchIsOpen ? <FiX size="24px" /> : <MdSearch size="24px" />
              }
              onClick={handleToggleSearch}
            />

            <Button
              d="flex"
              p="2"
              bg="transparent"
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              onClick={handlePushToProduct}
            >
              <Icon alignSelf="flex-end" boxSize="24px" as={IoMdCart} />
              <Box as="span" color="primary" fontWeight="bold">
                {cartItems.length < 100 ? cartItems.length : "99+"}
              </Box>
            </Button>
          </Flex>

          <Flex
            pt="2"
            flexBasis="100%"
            id="search"
            position="relative"
            display={{
              base: searchIsOpen ? "flex" : "none",
              lg: "none",
            }}
          >
            <SearchBox value={searchQuery} onChange={handleSearch} />
            <SearchResult
              clearQuery={handleClearSearch}
              queryItems={queryItems}
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  storeItems: state.store.storeItems,
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch: APP.AuthDispatchTypes) => ({
  setCurrentUser: (payload: APP.CurrentUserTypes) =>
    dispatch(setCurrentUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
