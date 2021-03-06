import { Flex, Box, Text, VisuallyHidden, Icon, Link } from "@chakra-ui/react";
import ReactTooltip from "react-tooltip";
import { MdFavorite } from "react-icons/md";

const SubFooter = () => {
  return (
    <Flex
      py="4"
      justify="space-between"
      align="center"
      direction="column"
      fontSize={{ base: "14px", md: "16px" }}
    >
      <Box>
        <Text textAlign="center">
          Copyright 2021 Fendus - All Rights Reserved.
        </Text>
      </Box>
      <Box>
        <Text>
          Made with{" "}
          <Text as="em">
            <VisuallyHidden>love</VisuallyHidden>
            <Icon as={MdFavorite} boxSize="5" color="red" />
          </Text>{" "}
          by{" "}
          <Link
            target="_blank"
            rel="noreferrer"
            textDecor="underline"
            data-tip="A. David Oluseun"
            data-for="aod"
            href="https://davidoluseun.herokuapp.com/"
          >
            aod
          </Link>
          <ReactTooltip id="aod" effect="solid" />
        </Text>
      </Box>
    </Flex>
  );
};

export default SubFooter;
