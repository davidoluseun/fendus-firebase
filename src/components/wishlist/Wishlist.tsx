import { Box, Heading, Flex, Image, Grid, Button } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { LinkBox, LinkOverlay } from "@chakra-ui/react";
import * as CurrencyFormat from "react-currency-format";
import { useHistory, Link as RouteLink } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import { connect } from "react-redux";
import AccountNav from "../common/AccountNav";
import EmptyCategory from "../common/EmptyCategory";
import { addAllWishlistItemsToCart } from "../../redux";

type WishlistProps = {
  storeItems: APP.StoreItemTypes[];
  addAllWishlistItemsToCart: () => APP.StoreActionTypes;
};

const Wishlist = (props: WishlistProps) => {
  const { storeItems, addAllWishlistItemsToCart } = props;
  const history = useHistory();

  const savedItems = storeItems.filter(
    (storeItem: APP.StoreItemTypes) => storeItem.saved === true
  );

  const handleAddToCart = () => {
    addAllWishlistItemsToCart();
    history.push("/cart");
  };

  return (
    <Box as="section" px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
      <Grid templateColumns={{ lg: "230px 1fr" }} gridColumnGap="6">
        <AccountNav />

        <Box>
          <Flex
            as="section"
            justify="space-between"
            fontSize={{ base: "18px", sm: "24px" }}
          >
            <Flex align="center">
              <Icon as={MdFavorite} color="primary" />
              <Heading as="h1" ml={{ base: "1", sm: "2" }} fontSize="inherit">
                Wishlist
              </Heading>
            </Flex>

            {savedItems.length !== 0 && (
              <Button
                bg="primary"
                color="#fff"
                _hover={{ bg: "primary", color: "#fff" }}
                _active={{ bg: "primary", color: "#fff" }}
                fontSize={{ base: "14px", sm: "1rem" }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            )}
          </Flex>

          <Box mt="6">
            {savedItems.length === 0 ? (
              <EmptyCategory category="wishlist" isWishlist={true} />
            ) : (
              <Grid
                gridGap="6"
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                }}
              >
                {savedItems.map((savedItem) => (
                  <LinkBox
                    key={savedItem._id}
                    bg="#fff"
                    fontSize="16px"
                    borderRadius="md"
                    justifyContent="space-between"
                    boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
                  >
                    <Image borderTopRadius="md" src={savedItem.image} alt="" />

                    <Flex p="4" direction="column">
                      <Heading
                        as="h3"
                        mb="2"
                        fontWeight="semibold"
                        fontSize="inherit"
                      >
                        <LinkOverlay
                          as={RouteLink}
                          noOfLines={1}
                          to={`/products/${savedItem.category}/${savedItem._id}`}
                        >
                          {savedItem.description}
                        </LinkOverlay>
                      </Heading>

                      <Box>
                        <CurrencyFormat
                          renderText={(value: number) => (
                            <Box as="strong" color="primary">
                              {value}
                            </Box>
                          )}
                          decimalScale={2}
                          value={savedItem.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix="&#8358;"
                        />
                        <Box
                          fontWeight="semibold"
                          color={savedItem.inStock ? "green" : "#da0707"}
                        >
                          {savedItem.inStock ? "In stock" : "Out of stock"}
                        </Box>
                      </Box>
                    </Flex>
                  </LinkBox>
                ))}
              </Grid>
            )}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  storeItems: state.store.storeItems,
});

const mapDispatchToProps = (dispatch: APP.StoreDispatchTypes) => ({
  addAllWishlistItemsToCart: () => dispatch(addAllWishlistItemsToCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
