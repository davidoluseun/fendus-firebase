import { Flex, Box } from "@chakra-ui/react";
import Categories from "./Categories";
import HeroSlider from "./HeroSlider";
import Offers from "../offers/Offers";

const Hero = () => {
  return (
    <Box as="section">
      <Flex h={{ md: "359px" }}>
        <Categories />
        <HeroSlider />
      </Flex>
      <Offers />
    </Box>
  );
};

export default Hero;
