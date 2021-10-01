import { Box, Heading, Flex, Link, Image, Grid } from "@chakra-ui/react";
import { LinkBox, LinkOverlay, IconButton, Icon } from "@chakra-ui/react";
import * as CurrencyFormat from "react-currency-format";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Link as RouteLink } from "react-router-dom";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { incrementItem, decrementItem } from "../../redux";

type ProductLayout02Props = {
  products: APP.StoreItemTypes[];
  title?: string;
  hasHeading?: boolean;
  hasMore?: boolean;
  path?: string;
  incrementItem: (payload: APP.StoreItemTypes) => APP.StoreActionTypes;
  decrementItem: (payload: APP.StoreItemTypes) => APP.StoreActionTypes;
};

const ProductLayout02 = (props: ProductLayout02Props) => {
  const { products, title, hasHeading, hasMore, path } = props;
  const { incrementItem, decrementItem } = props;

  const handleIncrement = (product: APP.StoreItemTypes) => {
    if (product.numInCart === 0) toast.dark(`${product.title} added to cart`);

    incrementItem(product);
  };

  const handleDecrement = (product: APP.StoreItemTypes) => {
    if (product.numInCart === 1)
      toast.dark(`${product.title} removed from cart`);

    decrementItem(product);
  };

  return (
    <Box mt="6" as={hasHeading ? "section" : "div"}>
      {hasHeading ? (
        <Flex align="center" px="4" py="3" justify="space-between">
          <Heading as="h1" ml="-4" fontSize="20px" textTransform="capitalize">
            {title}
          </Heading>
          {hasMore ? (
            <Link
              as={RouteLink}
              to={path ? path : "/"}
              fontSize="16px"
              fontWeight="semibold"
              _hover={{ textDecor: "none" }}
            >
              View more
              <Icon boxSize="20px" as={MdKeyboardArrowRight} />
            </Link>
          ) : null}
        </Flex>
      ) : null}

      <Grid
        mt="4"
        gridGap="6"
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
      >
        {products.map((product) => (
          <LinkBox
            key={product._id}
            bg="#fff"
            fontSize="16px"
            borderRadius="md"
            boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
          >
            <Image src={product.image} alt="" borderTopRadius="md" />

            <Flex p="4" justify="space-between">
              <Flex mr="2" direction="column" justify="space-between">
                <Heading as="h3" fontWeight="semibold" fontSize="inherit">
                  <LinkOverlay
                    as={RouteLink}
                    to={`/products/${product.category}/${product._id}`}
                    noOfLines={1}
                  >
                    {product.description}
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
                    value={product?.price}
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
                </Box>
              </Flex>
              <Flex direction="column" flexBasis="30px" align="flex-end">
                <IconButton
                  h="26px"
                  order={1}
                  minW="26px"
                  color="primary"
                  bg="transparent"
                  borderRadius="4px"
                  border="1px solid #dc004e"
                  _hover={{ bg: "primary", color: "#fff" }}
                  _active={{ bg: "primary", color: "#fff" }}
                  aria-label="Increase number of item by one"
                  icon={<FiPlus size="20px" />}
                  onClick={() => handleIncrement(product)}
                />
                <Flex
                  direction="column"
                  align="center"
                  visibility={product.numInCart === 0 ? "hidden" : "visible"}
                >
                  <IconButton
                    h="26px"
                    minW="26px"
                    color="primary"
                    bg="transparent"
                    borderRadius="4px"
                    border="1px solid #dc004e"
                    _hover={{ bg: "primary", color: "#fff" }}
                    _active={{ bg: "primary", color: "#fff" }}
                    aria-label="Decrease number of item by one"
                    icon={<FiMinus size="20px" />}
                    onClick={() => handleDecrement(product)}
                  />
                  <Box as="span" my="1">
                    {product.numInCart}
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </LinkBox>
        ))}
      </Grid>
    </Box>
  );
};

const mapDispatchToProps = (dispatch: APP.StoreDispatchTypes) => ({
  incrementItem: (payload: APP.StoreItemTypes) =>
    dispatch(incrementItem(payload)),

  decrementItem: (payload: APP.StoreItemTypes) =>
    dispatch(decrementItem(payload)),
});

export default connect(null, mapDispatchToProps)(ProductLayout02);
