import * as React from "react";
import { Box, Grid, Image, Heading } from "@chakra-ui/react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as CurrencyFormat from "react-currency-format";
import { removeItemFromCartToWishlist, addItemToWishlist } from "../../redux";
import { addItemToCart, removeItemFromWishlistToCart } from "../../redux";

type ProductItemProps = {
  product: APP.StoreItemTypes;
  storeItems: APP.StoreItemTypes[];
  addItemToCart: (payload: APP.StoreItemTypes) => APP.StoreActionTypes;
  addItemToWishlist: (payload: APP.StoreItemTypes) => APP.StoreActionTypes;
  removeItemFromCartToWishlist: (
    payload: APP.StoreItemTypes
  ) => APP.StoreActionTypes;
  removeItemFromWishlistToCart: (
    payload: APP.StoreItemTypes
  ) => APP.StoreActionTypes;
};

const ProductItem = (props: ProductItemProps) => {
  const { product, addItemToCart, storeItems, addItemToWishlist } = props;
  const { removeItemFromCartToWishlist, removeItemFromWishlistToCart } = props;

  const [isInCart, setIsInCart] = React.useState(false);

  const history = useHistory();
  const alert = useAlert();

  const cartItems = storeItems.filter(
    (storeItem: APP.StoreItemTypes) => storeItem.numInCart > 0
  );

  const savedItems = storeItems.filter(
    (storeItem: APP.StoreItemTypes) => storeItem.saved === true
  );

  React.useEffect(() => {
    const cartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem === product
    );

    if (cartItemIndex === -1) setIsInCart(false);
    else setIsInCart(true);
    
  }, [cartItems, product]);

  const handlePushToCart = () => {
    history.push("/cart");
  };

  const handleAddToCart = (product: APP.StoreItemTypes) => {
    const savedItemIndex = savedItems.findIndex(
      (savedItem) => savedItem === product
    );

    if (savedItemIndex !== -1) {
      alert.show("This item is in wishlist, do you wish to move it to cart?", {
        title: "Move to Cart",
        closeCopy: "No",
        actions: [
          {
            copy: "Yes",
            onClick: () => {
              setIsInCart(true);
              removeItemFromWishlistToCart(product);
              toast.dark(`${product.title} moved to cart`);
            },
          },
        ],
      });
    } else if (product.numInCart === 0) {
      setIsInCart(true);
      addItemToCart(product);
      toast.dark(`${product.title} added to cart`);
    }
  };

  const handleAddToWishlist = (product: APP.StoreItemTypes) => {
    const cartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem === product
    );

    if (cartItemIndex !== -1) {
      alert.show("This item is in cart, do you wish to move it to wishlist?", {
        title: "Move to Wishlist",
        closeCopy: "No",
        actions: [
          {
            copy: "Yes",
            onClick: () => {
              setIsInCart(false);
              removeItemFromCartToWishlist(product);
              toast.dark(`${product.title} moved to wishlist`);
            },
          },
        ],
      });
    } else if (product.saved === false) {
      addItemToWishlist(product);
      toast.dark(`${product.title} added to wishlist`);
    }
  };

  return (
    <Box mt="6" as="section">
      <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gridGap="4">
        <Flex align="center" justify="center">
          <Image
            w={{ sm: "300px" }}
            align="center"
            borderRadius="md"
            src={product.image}
            alt=""
          />
        </Flex>
        <Box>
          <Heading fontSize="26px" mb="4">
            {product.title}
          </Heading>

          <Text mb="4">{product.description}</Text>

          <Flex mb="5" direction="column">
            <CurrencyFormat
              renderText={(value: number) => <Box as="strong">{value}</Box>}
              decimalScale={2}
              value={product.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix="&#8358;"
            />

            <Box
              fontWeight="semibold"
              color={product.inStock ? "green" : "#da0707"}
            >
              {product.inStock ? "In stock" : "Out of stock"}
            </Box>
          </Flex>

          <Flex>
            {isInCart ? (
              <Button
                flexBasis="120px"
                color="primary"
                bg="transparent"
                border="1px solid"
                borderColor="primary"
                _hover={{ bg: "primary", color: "#fff" }}
                _active={{ bg: "primary", color: "#fff" }}
                onClick={handlePushToCart}
              >
                View Cart
              </Button>
            ) : (
              <Button
                flexBasis="120px"
                color="primary"
                bg="transparent"
                border="1px solid"
                borderColor="primary"
                _hover={{ bg: "primary", color: "#fff" }}
                _active={{ bg: "primary", color: "#fff" }}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            )}

            <Button
              ml="5"
              bg="primary"
              color="#fff"
              border="1px solid"
              borderColor="primary"
              _hover={{ bg: "primary", color: "#fff" }}
              _active={{ bg: "primary", color: "#fff" }}
              onClick={() => handleAddToWishlist(product)}
            >
              Add to Wishlist
            </Button>
          </Flex>
        </Box>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  storeItems: state.store.storeItems,
});

const mapDispatchToProps = (dispatch: APP.StoreDispatchTypes) => ({
  addItemToCart: (payload: APP.StoreItemTypes) =>
    dispatch(addItemToCart(payload)),

  addItemToWishlist: (payload: APP.StoreItemTypes) =>
    dispatch(addItemToWishlist(payload)),

  removeItemFromCartToWishlist: (payload: APP.StoreItemTypes) =>
    dispatch(removeItemFromCartToWishlist(payload)),

  removeItemFromWishlistToCart: (payload: APP.StoreItemTypes) =>
    dispatch(removeItemFromWishlistToCart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
