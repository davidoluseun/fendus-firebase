import * as React from "react";
import { Flex, Box, Icon } from "@chakra-ui/react";

type OfferProps = {
  title: string;
  text: string;
  OfferIcon?: React.ComponentType;
};

const Offer = ({ title, text, OfferIcon }: OfferProps) => {
  return (
    <Flex
      mb="1"
      bg="#fff"
      align="center"
      borderRadius="md"
      p={{ base: "3", xl: "4" }}
      boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
    >
      <Icon
        as={OfferIcon}
        mr={{ base: "2", xl: "3" }}
        boxSize={{ base: "24px", xl: "40px" }}
      />
      <Box>
        <Box
          fontSize={{ base: "16px", xl: "20px" }}
          fontWeight="semibold"
          lineHeight="1.3"
        >
          {title}
        </Box>
        <Box fontSize={{ base: "16px", xl: "18px" }}>{text}</Box>
      </Box>
    </Flex>
  );
};

export default Offer;
