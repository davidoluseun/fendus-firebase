import { Box, Flex, Heading, Divider } from "@chakra-ui/react";
import CurrencyFormat from "react-currency-format";

type OrderSummaryProps = {
  total: string;
  deliveryFee: string;
};

const OrderSummary = ({ total, deliveryFee }: OrderSummaryProps) => {
  const subtotal = Number(total) - Number(deliveryFee);
  
  return (
    <Box
      p="4"
      bg="#fff"
      as="section"
      borderRadius="md"
      alignSelf="start"
      boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
    >
      <Heading as="h2" mb="3" fontSize="18px" fontWeight="semibold">
        Order Summary
      </Heading>
      <Flex mb="2" justify="space-between">
        <Box>Subtotal:</Box>

        <CurrencyFormat
          renderText={(value: number) => <Box>{value}</Box>}
          decimalScale={2}
          value={subtotal}
          displayType={"text"}
          thousandSeparator={true}
          prefix="&#8358;"
        />
      </Flex>
      <Flex mb="2" justify="space-between">
        <Box>Delivery:</Box>
        <CurrencyFormat
          renderText={(value: number) => <Box>{value}</Box>}
          decimalScale={2}
          value={deliveryFee}
          displayType={"text"}
          thousandSeparator={true}
          prefix="&#8358;"
        />
      </Flex>

      <Divider mb="2" />

      <Flex justify="space-between">
        <Box fontWeight="semibold">Total:</Box>

        <CurrencyFormat
          renderText={(value: number) => <Box>{value}</Box>}
          decimalScale={2}
          value={total}
          displayType={"text"}
          thousandSeparator={true}
          prefix="&#8358;"
        />
      </Flex>
    </Box>
  );
};

export default OrderSummary;
