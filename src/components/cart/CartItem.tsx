import { Box, Image, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import * as CurrencyFormat from "react-currency-format";
import ReactTooltip from "react-tooltip";
import { FiX } from "react-icons/fi";
import { FiPlus, FiMinus } from "react-icons/fi";

type CartItemProps = {
  cartItems: APP.StoreItemTypes[];
  incrementItem: (item: APP.StoreItemTypes) => APP.StoreActionTypes;
  decrementItem: (item: APP.StoreItemTypes) => APP.StoreActionTypes;
  removeItemFromCart: (item: APP.StoreItemTypes) => APP.StoreActionTypes;
};

const CartItem = (props: CartItemProps) => {
  const { cartItems, incrementItem, decrementItem, removeItemFromCart } = props;

  return (
    <Box>
      {cartItems.map((cartItem) => (
        <Flex
          key={cartItem._id}
          bg="#fff"
          p="4"
          mb="6"
          as="section"
          borderRadius="md"
          position="relative"
          direction={{ base: "column", sm: "row" }}
          boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
        >
          <Flex
            justify="flex-end"
            position={{ base: "absolute", sm: "static" }}
            right="24px"
            top="24px"
            order={{ sm: 1 }}
            mb={{ sm: "0" }}
          >
            <IconButton
              bg="bg"
              borderRadius="full"
              aria-label="Remove item from cart"
              icon={<FiX size="24px" />}
              _hover={{ bg: "bg" }}
              _active={{ bg: "bg" }}
              data-tip="Remove item"
              data-for="remove"
              onClick={() => removeItemFromCart(cartItem)}
            />
            <ReactTooltip id="remove" effect="solid" />
          </Flex>

          <Image
            w={{ sm: "120px" }}
            src={cartItem.image}
            borderRadius="md"
            alt=""
          />

          <Flex
            pl={{ sm: "4" }}
            flexGrow={1}
            direction="column"
            justify="space-between"
          >
            <Box mb="3" mt={{ base: "2", sm: "0" }} pr="5">
              <Heading as="h1" fontSize="20px" mb="2">
                {cartItem.title}
              </Heading>
              <Text noOfLines={2}>{cartItem.description}</Text>
            </Box>

            <Flex justify="space-between" fontSize="14px">
              <Flex>
                <CurrencyFormat
                  renderText={(value: number) => (
                    <Flex>
                      <Box mr="1">{value}</Box>
                      <Box>x {cartItem.numInCart}</Box>
                    </Flex>
                  )}
                  decimalScale={2}
                  value={cartItem.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix="&#8358;"
                />

                <CurrencyFormat
                  renderText={(value: number) => (
                    <Box ml="1" fontWeight="semibold" color="primary">
                      {value}
                    </Box>
                  )}
                  decimalScale={2}
                  value={cartItem.price * cartItem.numInCart}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix="&#8358;"
                />
              </Flex>

              <Flex align="center" justify="space-between">
                <IconButton
                  minW="26px"
                  h="26px"
                  color="primary"
                  bg="transparent"
                  borderRadius="4px"
                  border="1px solid #dc004e"
                  _hover={{ bg: "primary", color: "#fff" }}
                  _active={{ bg: "primary", color: "#fff" }}
                  aria-label="Increase number of item by one"
                  icon={<FiPlus size="20px" />}
                  onClick={() => incrementItem(cartItem)}
                />
                <Box as="span" mx="2">
                  {cartItem.numInCart}
                </Box>
                <IconButton
                  minW="26px"
                  h="26px"
                  color="primary"
                  bg="transparent"
                  borderRadius="4px"
                  border="1px solid #dc004e"
                  _hover={{ bg: "primary", color: "#fff" }}
                  _active={{ bg: "primary", color: "#fff" }}
                  aria-label="Decrease number of item by one"
                  icon={<FiMinus size="20px" />}
                  disabled={cartItem.numInCart === 1 ? true : false}
                  onClick={() => decrementItem(cartItem)}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Box>
  );
};

export default CartItem;
