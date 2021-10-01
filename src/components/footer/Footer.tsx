import { Box, Divider } from "@chakra-ui/react";
import MainFooter from "./MainFooter";
import SubFooter from "./SubFooter";

const Footer = () => {
  return (
    <Box as="footer" bg="secondary" color="#fff" mt="10">
      <Box px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
        <MainFooter />
        <Divider borderColor="#fff" />
        <SubFooter />
      </Box>
    </Box>
  );
};

export default Footer;
